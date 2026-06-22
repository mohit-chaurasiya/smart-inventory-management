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
        const invoiceNumber =
            `INV-${Date.now()}`;

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
            invoiceNumber,
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

        const sale = await Sale.findById(req.params.id)
            .populate("customer", "name phone")
            .populate("items.product", "name");

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: "Sale not found",
            });
        }

        const doc = new PDFDocument({
            margin: 50,
            size: "A4",
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=invoice-${sale.invoiceNumber || sale._id}.pdf`
        );

        doc.pipe(res);

        /* =========================
           HEADER
        ========================= */

        doc
            .rect(0, 0, 612, 110)
            .fill("#0F172A");

        doc
            .fillColor("white")
            .fontSize(28)
            .text("SMART INVENTORY AI", 50, 30);

        doc
            .fontSize(14)
            .fillColor("#94A3B8")
            .text("Smart Inventory & Billing Solution", 50, 65);

        doc
            .fontSize(26)
            .fillColor("#14B8A6")
            .text("INVOICE", 420, 40);



        doc.save();

        doc.rotate(-45, {
            origin: [300, 400],
        });

        doc
            .fontSize(80)
            .fillColor("#E2E8F0")
            .opacity(0.3)
            .text(
                sale.paymentStatus.toUpperCase(),
                120,
                350
            );

        doc.restore();

        /* =========================
           INVOICE INFO
        ========================= */

        doc.roundedRect(50, 140, 240, 90, 10).stroke();
        doc.roundedRect(320, 140, 240, 90, 10).stroke();

        doc
            .fillColor("#14B8A6")
            .fontSize(14)
            .text("Customer Details", 340, 155);

        doc
            .fillColor("black")
            .fontSize(11)
            .text(
                `Name: ${sale.customer?.name || "Walk-in Customer"}`,
                340,
                185
            )
            .text(
                `Phone: ${sale.customer?.phone || "-"}`,
                340,
                205
            );

        doc
            .fontSize(14)
            .fillColor("#14B8A6")
            .text("Invoice Details", 70, 155);

        doc
            .fillColor("black")
            .fontSize(11)
            .text(`Invoice No: ${sale.invoiceNumber}`, 70, 185)
            .text(
                `Date: ${new Date(sale.createdAt).toLocaleDateString()}`,
                70,
                205
            );


        /* =========================
           ITEMS TABLE
        ========================= */

        const tableTop = 280;

        doc
            .rect(50, tableTop, 510, 30)
            .fill("#14B8A6");

        doc
            .fillColor("white")
            .fontSize(12)
            .text("Product", 60, tableTop + 10)
            .text("Qty", 300, tableTop + 10)
            .text("Price", 370, tableTop + 10)
            .text("Subtotal", 460, tableTop + 10);

        let y = tableTop + 40;

        sale.items.forEach((item) => {

            doc
                .fillColor("black")
                .rect(50, y - 5, 510, 30)
                .stroke("#CBD5E1");

            doc
                .text(item.product.name, 60, y)
                .text(item.quantity.toString(), 300, y)
                .text(`Rs. ${item.price}`, 370, y)
                .text(`Rs. ${item.subtotal}`, 460, y);

            y += 35;
        });

        /* =========================
           SUMMARY BOX
        ========================= */

        doc
            .roundedRect(340, y + 30, 220, 120, 10)
            .fillAndStroke("#F8FAFC", "#CBD5E1");

        doc
            .fillColor("black")
            .fontSize(12)
            .text(`Total Amount`, 360, y + 50)
            .text(`Rs. ${sale.totalAmount}`, 480, y + 50)

            .text(`Paid Amount`, 360, y + 75)
            .text(`Rs. ${sale.paidAmount}`, 480, y + 75)

            .text(`Due Amount`, 360, y + 100)
            .text(`Rs. ${sale.dueAmount}`, 480, y + 100)

            .text(`Status`, 360, y + 125)
            .text(
                sale.paymentStatus.toUpperCase(),
                480,
                y + 125
            );
        /* =========================
           FOOTER
        ========================= */

        doc
            .moveTo(50, 700)
            .lineTo(180, 700)
            .stroke();

        doc.text("Authorized Signature", 50, 710);

        doc
            .fontSize(11)
            .fillColor("gray")
            .text(
                "Thank you for choosing Smart Inventory AI",
                0,
                760,
                { align: "center" }
            )

            .text(
                "support@smartinventory.com | +91 9876543210",
                {
                    align: "center",
                }
            );

        doc.end();

    } catch (error) {

        console.log(
            "Invoice Generation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
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