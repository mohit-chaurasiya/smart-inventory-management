const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null,
            path.join(__dirname, "../uploads")
        );
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            "-" +
            file.originalname
        );
    },
});

const fileFilter = (
    req,
    file,
    cb
) => {

    const allowedTypes = [

        "application/pdf",

        "image/jpeg",

        "image/jpg",

        "image/png",

    ];

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only PDF, JPG and PNG files are allowed"
            ),
            false
        );
    }

};

module.exports = multer({
    storage,
    fileFilter,
});