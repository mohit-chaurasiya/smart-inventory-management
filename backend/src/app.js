const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoute");

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
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Inventory AI API is running...",
    });
});

module.exports = app;