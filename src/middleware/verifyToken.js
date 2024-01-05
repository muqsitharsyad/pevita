const jwt =  require('jsonwebtoken')
const { jsonFormat } = require('../utils/jsonFormat')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token || !authHeader) return jsonFormat(res, 401, "No token provided")
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if(err) return jsonFormat(res, 401, err.message)
        req.email  = decoded.email
        req.userId = decoded.userId
        req.name   = decoded.name
        next()
    })
}