const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware");

const {
    addTransaction,
    getAllTransactions,
    getProductTransactions
} = require("../controllers/inventoryController");

router.post("/", isAuthenticated, addTransaction);
router.get("/", isAuthenticated, getAllTransactions);

router.get(
    "/:productId",
    isAuthenticated,
    getProductTransactions
);

module.exports = router;