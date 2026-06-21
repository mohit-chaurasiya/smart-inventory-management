const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

router.get("/", isAuthenticated, getDashboardStats);

module.exports = router;