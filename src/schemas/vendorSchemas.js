const { body } = require('express-validator');

exports.storeSchema = [
    body("nama").notEmpty().withMessage("kolom tidak boleh kosong"),
    body("nama").isString().trim().escape().withMessage("kolom harus berupa string")
];

exports.updateSchema = [
    body("nama").notEmpty().withMessage("kolom tidak boleh kosong"),
    body("nama").isString().trim().escape().withMessage("kolom harus berupa string")
];