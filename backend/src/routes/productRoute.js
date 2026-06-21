const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, createProduct);
router.get("/", isAuthenticated, getAllProducts);
router.get("/:id", isAuthenticated, getSingleProduct);
router.post("/:id", isAuthenticated, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);


module.exports = router;