const express = require("express");
const router = express.Router();

const { index, store, show, update, destroy } = require("../controllers/paketControllers");
const { storeSchema, updateSchema } = require("../schemas/PaketSchemas");
const { validate } = require('../middleware/validate');

router.get("/", index);
router.post("/", storeSchema, validate, store);
router.get("/:id", show);
router.put("/:id", updateSchema, validate, update);
router.delete("/:id", destroy);

module.exports = router;