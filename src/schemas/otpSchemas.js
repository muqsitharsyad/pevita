const { body } = require('express-validator');

exports.otpSchema = [
    body("no_hape").isNumeric().notEmpty().withMessage("kolom tidak boleh kosong"),
    body("kode_otp").isNumeric().notEmpty().withMessage("kolom tidak boleh kosong"),
];