const { body } = require('express-validator');

exports.loginSchema = [
    body("email").isEmail().notEmpty().withMessage("kolom tidak boleh kosong"),
    body("password").notEmpty().withMessage("kolom tidak boleh kosong"),
];