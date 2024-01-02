const express = require("express");
const router = express.Router();

const { index, gen_nosurat } = require("../controllers/nadineControllers");
const { storeSchema } = require("../schemas/nadineSchemas");
const { validate } = require('../middleware/validate');
const verifyToken = require("../middleware/verifyToken");

router.get("/", index);
router.post("/gen_nosurat", verifyToken, storeSchema, validate, gen_nosurat);

module.exports = router;