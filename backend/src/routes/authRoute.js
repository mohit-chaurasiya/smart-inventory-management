const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController")
const isAuthenticated = require("../middleware/authMiddleware")

router.post("/register", register);

router.post("/login", login);

router.get("/me", isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

module.exports = router;