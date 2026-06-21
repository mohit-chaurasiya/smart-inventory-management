const jwt = require("jsonwebtoken")
const User = require("../models/User")

const isAuthenticated = async (req, res, next) => {
    try {
        let token;

        // get token
        if (
            req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user
        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {

        console.log("Auth Middleware Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",

        })
    }
}

module.exports = isAuthenticated;