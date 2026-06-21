const Payment = require("../models/Payment");
const Customer = require("../models/Customer");

const addPayment = async (req, res) => {
    try {

        const {
            customerId,
            amount,
            paymentMethod,
            notes
        } = req.body;

        const customer =
            await Customer.findOne({
                _id: customerId,
                createdBy: req.user._id
            });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        if (amount > customer.totalDue) {
            return res.status(400).json({
                success: false,
                message: "Amount exceeds due amount"
            });
        }

        customer.totalDue -= amount;

        await customer.save();

        const payment = await Payment.create({
            customer: customerId,
            amount,
            paymentMethod,
            notes,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Payment added successfully",
            payment
        });

    } catch (error) {

        console.log("Payment Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    addPayment
};