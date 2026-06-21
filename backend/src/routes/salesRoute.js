const express = require("express");

const router = express.Router();

const isAuthenticated =
    require("../middleware/authMiddleware");

const { createSale, getAllSales, getTodaySales, getSingleSale, generateInvoice } =
    require("../controllers/salesController");

router.post(
    "/",
    isAuthenticated,
    createSale
);

router.get("/", isAuthenticated, getAllSales);

router.get(
    "/today",
    isAuthenticated,
    getTodaySales
);
router.get(
    "/invoice/:id",
    isAuthenticated,
    generateInvoice
);

router.get(
    "/:id",
    isAuthenticated,
    getSingleSale
);

module.exports = router;