const Product = require("../models/Product");
const InventoryTransaction = require("../models/InventoryTransaction");

const addTransaction = async (req, res) => {
    try {

        const { productId, type, quantity, notes } = req.body;

        const product = await Product.findOne({
            _id: productId,
            createdBy: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const previousStock = product.stock;

        // Stock Calculation
        switch (type) {

            case "purchase":
            case "return":
                product.stock += Number(quantity);
                break;

            case "sale":
            case "damage":

                if (product.stock < quantity) {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient stock",
                    });
                }

                product.stock -= Number(quantity);
                break;

            case "manual":
                product.stock = Number(quantity);
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: "Invalid transaction type",
                });
        }

        await product.save();

        const transaction = await InventoryTransaction.create({
            product: product._id,
            type,
            quantity,
            previousStock,
            currentStock: product.stock,
            notes,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
            transaction,
        });

    } catch (error) {

        console.log("Transaction Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const getAllTransactions = async (req, res) => {
    try {

        const transactions = await InventoryTransaction.find({ createdBy: req.user._id })
            .populate("product", "name sku")
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        console.log("Get Transactions Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getProductTransactions = async (req, res) => {
    try {

        const transactions = await InventoryTransaction.find({
            product: req.params.productId,
            createdBy: req.user._id
        })
            .populate("product", "name sku")
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        console.log("Product Transaction Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    addTransaction,
    getAllTransactions,
    getProductTransactions,
};