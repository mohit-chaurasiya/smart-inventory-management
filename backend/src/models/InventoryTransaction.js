const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        type: {
            type: String,
            enum: ["purchase", "sale", "return", "damage", "manual"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        previousStock: {
            type: Number,
            required: true,
        },

        currentStock: {
            type: Number,
            required: true,
        },

        notes: {
            type: String,
            trim: true,
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

module.exports = mongoose.model(
    "InventoryTransaction",
    inventoryTransactionSchema
);