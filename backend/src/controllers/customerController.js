const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
    try {

        const customer = await Customer.create({
            ...req.body,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
        });

    } catch (error) {

        console.log("Create Customer Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {

        const customers = await Customer.find({
            createdBy: req.user._id
        })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: customers.length,
            customers
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getSingleCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOne(
            {
                createdBy: req.user._id,
                _id: req.params.id
            }
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateCustomer = async (req, res) => {

    try {

        const customer = await Customer.findByOneAndUpdate(
            {
                createdBy: req.user._id,
                _id: req.params.id,

            },
            req.body,
            {
                new: true,
                runValidators: true
            }

        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const deleteCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        await customer.deleteOne();

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
};