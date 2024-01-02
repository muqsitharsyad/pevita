const express = require("express");
const router = express.Router();

const nadineRoutes = require('./nadineRoutes');
const userRoutes = require('./userRoutes')

router.use("/user", userRoutes);
router.use("/nadine", nadineRoutes);

module.exports = router;