const express = require("express");
const router = express.Router();

const nadineRoutes = require('./nadineRoutes');
const userRoutes = require('./userRoutes')
const otpRoutes =  require('./otpRoutes')

router.use("/user", userRoutes);
router.use("/nadine", nadineRoutes);
router.use("/otp", otpRoutes)

module.exports = router;