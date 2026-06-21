const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        sale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale"
        },

        amount: {
            type: Number,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "upi", "card"],
            default: "cash"
        },

        notes: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", paymentSchema);