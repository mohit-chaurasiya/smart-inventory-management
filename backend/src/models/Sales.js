const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                subtotal: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        paidAmount: {
            type: Number,
            default: 0
        },

        dueAmount: {
            type: Number,
            default: 0
        },

        paymentStatus: {
            type: String,
            enum: ["paid", "partial", "unpaid"],
            default: "unpaid"
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "upi", "card"],
            default: "cash"
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



module.exports = mongoose.model("Sale", saleSchema);