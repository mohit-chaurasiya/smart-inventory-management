const express = require("express");
const router = express.Router();
const upload = require(
    "../middleware/uploadMiddleware"
);

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getLowStockProducts } = require("../controllers/productController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, upload.single("image"), createProduct);
router.get("/", isAuthenticated, getAllProducts);
router.get(
    "/low-stock",
    isAuthenticated,
    getLowStockProducts
);
router.get("/:id", isAuthenticated, getSingleProduct);
router.put("/:id", isAuthenticated, upload.single("image"), updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);


module.exports = router;