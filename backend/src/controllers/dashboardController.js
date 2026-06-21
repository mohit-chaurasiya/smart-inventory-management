const Product = require("../models/Product");
const InventoryTransaction = require("../models/InventoryTransaction");

const getDashboardStats = async (req, res) => {
    try {

        const totalProducts = await Product.countDocuments();

        const lowStockProducts = await Product.countDocuments({
            $expr: {
                $lte: ["$stock", "$lowStockThreshold"]
            }
        });

        const products = await Product.find();

        const totalInventoryQuantity = products.reduce(
            (acc, product) => acc + product.stock,
            0
        );

        const totalInventoryValue = products.reduce(
            (acc, product) =>
                acc + (product.stock * product.purchasePrice),
            0
        );

        const recentTransactions = await InventoryTransaction.find()
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