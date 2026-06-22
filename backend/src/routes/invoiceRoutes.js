const express =
    require("express");

const router =
    express.Router();

const upload = require(
    "../middleware/invoiceUploadMiddleware"
);
const isAuthenticated = require(
    "../middleware/authMiddleware"
);

const {
    extractInvoice,
    confirmInvoiceUpdate
} = require(
    "../controllers/invoiceController"
);

router.post(
    "/extract",
    upload.single("file"),
    extractInvoice
);

router.post(
    "/confirm",
    isAuthenticated,
    confirmInvoiceUpdate
);

module.exports = router;