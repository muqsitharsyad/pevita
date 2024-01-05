const express = require("express");
const router = express.Router();

const { validate } = require("../middleware/validate");

const { refreshToken } = require("../controllers/auth/refreshTokenControllers");
const verifyToken = require("../middleware/verifyToken");
const { otpmessage, getTokenOTP } = require("../controllers/OTPControllers");
const { otpSchema } = require("../schemas/otpSchemas");

router.get('/', verifyToken, getTokenOTP)
router.post('/otpmessage', verifyToken, otpSchema, validate, otpmessage)

module.exports = router