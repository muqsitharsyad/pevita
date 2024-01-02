const express = require("express");
const router = express.Router();

const { validate } = require("../middleware/validate");
const { loginSchema } = require("../schemas/userSchemas");

const { login, getUser, logout } = require("../controllers/auth/userControllers");
const { refreshToken } = require("../controllers/auth/refreshTokenControllers");
const verifyToken = require("../middleware/verifyToken");

router.get('/', verifyToken, getUser)
router.post('/login', loginSchema, validate, login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

module.exports = router