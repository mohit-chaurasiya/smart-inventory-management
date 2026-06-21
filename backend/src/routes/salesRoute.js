const express = require("express");

const router = express.Router();

const isAuthenticated =
    require("../middleware/authMiddleware");

const { createSale } =
    require("../controllers/salesController");

router.post(
    "/",
    isAuthenticated,
    createSale
);

module.exports = router;