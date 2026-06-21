const Sale = require("../models/Sales");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const InventoryTransaction = require("../models/InventoryTransaction");
const PDFDocument = require("pdfkit");

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

            const product = await Product.findOne({
                _id: item.product,
                createdBy: req.user._id
            });

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
                await Customer.findOne({
                    _id: customer,
                    createdBy: req.user._id
                });

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

const getAllSales = async (req, res) => {
    try {

        const sales = await Sale.find({ createdBy: req.user._id })
            .populate("customer", "name phone")
            .populate("items.product", "name sku")
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sales.length,
            sales
        });

    } catch (error) {

        console.log("Get Sales Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getSingleSale = async (req, res) => {
    try {

        const sale = await Sale.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        })
            .populate("customer", "name phone email")
            .populate("items.product", "name sku")
            .populate("createdBy", "fullName");

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found"
            });
        }

        res.status(200).json({
            success: true,
            sale
        });

    } catch (error) {

        console.log("Get Sale Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getTodaySales = async (req, res) => {

    try {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const sales = await Sale.find({
            createdBy: req.user._id,
            createdAt: {
                $gte: start,
                $lte: end
            }
        });

        const totalSales = sales.reduce(
            (acc, sale) => acc + sale.totalAmount,
            0
        );

        res.status(200).json({
            success: true,
            totalTransactions: sales.length,
            totalSales
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



const generateInvoice = async (req, res) => {
    try {

        const sale = await Sale.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        })
            .populate("customer", "name phone")
            .populate("items.product", "name");

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found"
            });
        }

        const doc = new PDFDocument();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=invoice-${sale._id}.pdf`
        );

        doc.pipe(res);

        // Heading
        doc
            .fontSize(22)
            .text("Smart Inventory AI", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(16)
            .text(`Invoice ID: ${sale._id}`);

        doc.text(
            `Date: ${sale.createdAt.toDateString()}`
        );

        doc.moveDown();

        // Customer
        if (sale.customer) {

            doc
                .fontSize(14)
                .text("Customer Details");

            doc.text(
                `Name: ${sale.customer.name}`
            );

            doc.text(
                `Phone: ${sale.customer.phone}`
            );

            doc.moveDown();
        }

        // Products
        doc.fontSize(14).text("Items");

        sale.items.forEach((item, index) => {

            doc.text(
                `${index + 1}. ${item.product.name}`
            );

            doc.text(
                `Quantity: ${item.quantity}`
            );

            doc.text(
                `Price: ₹${item.price}`
            );

            doc.text(
                `Subtotal: ₹${item.subtotal}`
            );

            doc.moveDown();
        });

        doc.moveDown();

        doc.text(
            `Total Amount: ₹${sale.totalAmount}`
        );

        doc.text(
            `Paid Amount: ₹${sale.paidAmount}`
        );

        doc.text(
            `Due Amount: ₹${sale.dueAmount}`
        );

        doc.text(
            `Payment Status: ${sale.paymentStatus}`
        );

        doc.end();

    } catch (error) {

        console.log("Invoice Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



module.exports = {
    createSale,
    getAllSales,
    getSingleSale,
    getTodaySales,
    generateInvoice
};