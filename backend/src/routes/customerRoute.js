const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware");

const {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

router.post("/", isAuthenticated, createCustomer);

router.get("/", isAuthenticated, getAllCustomers);

router.get("/:id",
    isAuthenticated,
    getSingleCustomer
);

router.put("/:id",
    isAuthenticated,
    updateCustomer
);

router.delete("/:id",
    isAuthenticated,
    deleteCustomer
);

module.exports = router;