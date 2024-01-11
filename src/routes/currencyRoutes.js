const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const { validate } = require("../middleware/validate");

const verifyToken = require("../middleware/verifyToken");
const { index, codes, conversion, quota } = require("../controllers/currencyControllers");

const conversionSchema = [
    body("base_code").notEmpty().withMessage("column cannot be empty"),
    body("target_code").notEmpty().withMessage("column cannot be empty"),
    body("amount").notEmpty().withMessage("column cannot be empty"),
];

router.get('/', verifyToken, index)
router.get('/codes', verifyToken, codes)
router.get('/conversion', verifyToken, conversionSchema, validate, conversion)
router.get('/quota', verifyToken, quota)

module.exports = router