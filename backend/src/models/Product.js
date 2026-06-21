const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },

        sku: {
            type: String,
            unique: true,
        },

        purchasePrice: {
            type: Number,
            required: [true, "Purchase price is required"],
        },

        sellingPrice: {
            type: Number,
            required: [true, "Selling price is required"],
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        unit: {
            type: String,
            default: "pcs",
            trim: true,
        },

        manufacturer: {
            type: String,
            trim: true,
        },

        lowStockThreshold: {
            type: Number,
            default: 5,
        },

        image: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);