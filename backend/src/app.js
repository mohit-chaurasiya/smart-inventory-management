const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const inventoryRoutes = require("./routes/inventoryRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const customerRoutes = require("./routes/customerRoute");
const saleRoutes = require("./routes/salesRoute");
const paymentRoutes = require("./routes/paymentRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());


// Route

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/payments", paymentRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Inventory AI API is running...",
    });
});

module.exports = app;