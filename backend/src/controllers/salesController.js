const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const InventoryTransaction = require("../models/InventoryTransaction");

const createSale = async (req, res) => {
    try {

        const {
            customer,
            items,
            paidAmount = 0,
            paymentMethod
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one item"
            });
        }

        let saleItems = [];
        let totalAmount = 0;

        // Process each item
        for (const item of items) {

            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found`
                });
            }

            // Check stock
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} has insufficient stock`
                });
            }

            const subtotal =
                product.sellingPrice * item.quantity;

            totalAmount += subtotal;

            // Update stock
            const previousStock = product.stock;

            product.stock -= item.quantity;

            await product.save();

            // Inventory Transaction
            await InventoryTransaction.create({
                product: product._id,
                type: "sale",
                quantity: item.quantity,
                previousStock,
                currentStock: product.stock,
                notes: "Product sold",
                createdBy: req.user._id
            });

            saleItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.sellingPrice,
                subtotal
            });
        }

        // Due Calculation
        const dueAmount = totalAmount - paidAmount;

        let paymentStatus;

        if (dueAmount === 0) {
            paymentStatus = "paid";
        } else if (paidAmount === 0) {
            paymentStatus = "unpaid";
        } else {
            paymentStatus = "partial";
        }

        // Update Customer Due
        if (customer && dueAmount > 0) {

            const existingCustomer =
                await Customer.findById(customer);

            if (existingCustomer) {
                existingCustomer.totalDue += dueAmount;
                await existingCustomer.save();
            }
        }

        // Save Sale
        const sale = await Sale.create({
            customer,
            items: saleItems,
            totalAmount,
            paidAmount,
            dueAmount,
            paymentStatus,
            paymentMethod,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Sale created successfully",
            sale
        });

    } catch (error) {

        console.log("Create Sale Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createSale
};