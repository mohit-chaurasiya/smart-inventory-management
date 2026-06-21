const express = require("express");

const router = express.Router();

const isAuthenticated =
    require("../middleware/authMiddleware");

const { addPayment } =
    require("../controllers/paymentController");

router.post(
    "/",
    isAuthenticated,
    addPayment
);

module.exports = router;