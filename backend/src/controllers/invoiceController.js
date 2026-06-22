const Tesseract = require("tesseract.js");
const Product = require("../models/Product");

const Transaction = require("../models/InventoryTransaction");

const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

exports.extractInvoice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        console.log(req.file);

        // Allow only images for now
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
        ];

        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please upload JPG, JPEG or PNG image only.",
            });
        }

        // OCR
        const {
            data: { text },
        } = await Tesseract.recognize(
            req.file.path,
            "eng"
        );

        console.log("Extracted Text:");
        console.log(text);

        // Gemini Prompt
        const prompt = `
You are an inventory invoice extraction AI.

Extract all products from the invoice text.

Return ONLY a valid JSON array.

Format:

[
  {
    "name": "",
    "quantity": 0,
    "purchasePrice": 0
  }
]

Rules:
- Return only JSON.
- Do not use markdown.
- Do not add explanation.
- quantity must be a number.
- purchasePrice must be unit price.

Invoice Text:

${text}
`;

        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

        let raw = response.text;

        console.log("Gemini Raw:");
        console.log(raw);

        // Clean response
        raw = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let products = [];

        try {
            products = JSON.parse(raw);
        } catch (err) {
            console.log("JSON Parse Error:", err);

            return res.status(500).json({
                success: false,
                message:
                    "Failed to parse AI response",
            });
        }

        // Delete temp uploaded file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(200).json({
            success: true,
            extractedText: text,
            products,
        });

    } catch (error) {
        console.log("Invoice Error:");
        console.log(error);

        // Delete file even if error occurs
        if (
            req.file &&
            fs.existsSync(req.file.path)
        ) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to process invoice",
        });
    }
};


exports.confirmInvoiceUpdate = async (req, res) => {
    try {

        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No products found",
            });
        }

        for (const item of products) {

            let product = await Product.findOne({
                name: item.name,
            });

            let previousStock = 0;
            let currentStock = 0;

            // Existing Product
            if (product) {

                previousStock = product.stock;

                product.stock += Number(item.quantity);

                currentStock = product.stock;

                product.purchasePrice =
                    Number(item.purchasePrice);

                await product.save();

            } else {

                // New Product

                product = await Product.create({

                    name: item.name,

                    stock: Number(item.quantity),

                    purchasePrice:
                        Number(item.purchasePrice),

                    sellingPrice:
                        Number(item.purchasePrice) * 1.3,

                    category: "General",

                    unit: "pcs",

                    lowStockThreshold: 5,

                    description:
                        "Added from invoice upload",

                    sku: "INV-" + Date.now(),

                    createdBy: req.user._id,
                });

                previousStock = 0;
                currentStock = product.stock;
            }

            // Create Transaction ONLY ONCE

            await Transaction.create({

                product: product._id,

                type: "purchase",

                quantity: Number(item.quantity),

                previousStock,

                currentStock,

                notes:
                    "Stock updated from invoice upload",

                createdBy: req.user._id,
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Inventory updated successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};