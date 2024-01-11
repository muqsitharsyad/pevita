const express = require("express");
const router = express.Router();

const nadineRoutes = require('./nadineRoutes');
const userRoutes = require('./userRoutes')
const otpRoutes =  require('./otpRoutes')
const currencyRoutes =  require('./currencyRoutes')

router.use("/user", userRoutes);
router.use("/nadine", nadineRoutes);
router.use("/otp", otpRoutes)
router.use("/currency", currencyRoutes)

module.exports = router;