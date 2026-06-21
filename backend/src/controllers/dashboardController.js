const Product = require("../models/Product");
const InventoryTransaction = require("../models/InventoryTransaction");

const getDashboardStats = async (req, res) => {
    try {

        const totalProducts = await Product.countDocuments({ createdBy: req.user._id });

        const lowStockProducts = await Product.countDocuments({
            createdBy: req.user._id,
            $expr: {
                $lte: ["$stock", "$lowStockThreshold"]
            }
        });

        const products = await Product.find({ createdBy: req.user._id });

        const totalInventoryQuantity = products.reduce(
            (acc, product) => acc + product.stock,
            0
        );

        const totalInventoryValue = products.reduce(
            (acc, product) =>
                acc + (product.stock * product.purchasePrice),
            0
        );

        const recentTransactions = await InventoryTransaction.find({ createdBy: req.user._id })
            .populate("product", "name sku")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                lowStockProducts,
                totalInventoryQuantity,
                totalInventoryValue
            },
            recentTransactions
        });

    } catch (error) {

        console.log("Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getDashboardStats
};