const log4js = require('log4js');
const errorLog = log4js.getLogger("error");

const { jsonFormat } = require('../../utils/jsonFormat')
const jwt = require('jsonwebtoken');
const Users = require('../../models/userModels');

exports.refreshToken = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return jsonFormat(res, 401, "No token provided")
        const user = await Users.findAll({where:{refresh_token: refreshToken}})
        if(!user[0]) return jsonFormat(res, 403, "Not Accessible")
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
            if(err) return jsonFormat(res, 403, "Not Accessible")
            const userId = user.id
            const name = user.name
            const email = user.email

            const token = jwt.sign({userId, name, email}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '1h'})
            return jsonFormat(res, 200, "The new token has been generated", {access_token: token})
    })
    }catch(err){
        console.log(err)
        errorLog.error(`at function refreshTokenController(refreshToken) => ${err}`);
        next(err);
    }
}