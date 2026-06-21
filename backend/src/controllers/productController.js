const Product = require("../models/Product");
const { nanoid } = require("nanoid");

const createProduct = async (req, res) => {
    try {

        const sku = `PRD-${nanoid(8).toUpperCase()}`;

        const product = await Product.create({
            ...req.body,
            sku,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {

        console.log("Create Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getAllProducts = async (req, res) => {
    try {

        const { search, category, page = 1, limit = 10 } = req.query;

        let query = {};

        // Search by product name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query)
            .populate("createdBy", "fullName email")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (error) {

        console.log("Get Products Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("createdBy", "fullName email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        console.log("Get Single Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        console.log("Update Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log("Delete Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getLowStockProducts = async (req, res) => {
    try {

        const lowStockProducts = await Product.find({
            $expr: {
                $lte: ["$stock", "$lowStockThreshold"]
            }
        })
            .populate("createdBy", "fullName email")
            .sort({ stock: 1 });

        res.status(200).json({
            success: true,
            count: lowStockProducts.length,
            products: lowStockProducts
        });

    } catch (error) {

        console.log("Low Stock Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
};