const log4js = require('log4js');
const errorLog = log4js.getLogger("error");
const traceLog = log4js.getLogger("trace");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../../models/userModels');
const { jsonFormat } = require('../../utils/jsonFormat');
const { isNull } = require('../../utils/isNull');

exports.getUser = async(req, res, next) => {
    //? User Data
    const userId   = req.userId
    const userName = req.name

    try{
        const user = await Users.findAll({attributes:['id', 'name', 'email']})
        if (isNull(user)) {
            return jsonFormat(res, 400, "The Email is not Registered")
        }else{
            traceLog.trace(`[Get User] Name : ${userName}, id : ${userId}`)
            return jsonFormat(res, 200, "User Data", user)
        }
    }catch(err){
        console.log(err)
        errorLog.error(`at function userController(getUser) => ${err}`);
        next(err);
    }
}

exports.register = async(req, res, next) => {
    const name         = req.body.name
    const email        = req.body.email
    const password     = req.body.password
    const confPassword = req.body.confPassword

    if(password !== confPassword) return jsonFormat(res, 400, "Password and Confirm Password do not match")
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });

        traceLog.trace(`[Register] User Registration Successful - Name : ${name}, Email : ${email}`)
        return jsonFormat(res, 200, "Registration Successful")
    } catch (err) {
        console.log(err)
        errorLog.error(`at function userController(register) => ${err}`);
        next(err);
    }
}

exports.login = async(req, res, next) => {
    const emaill   = req.body.email;
    const password = req.body.password;

    try{
        const user = await  Users.findOne({where: {email: emaill}})
        if (isNull(user)) {
            return jsonFormat(res, 400, "The Email is not Registered")
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return jsonFormat(res, 400, "Incorrect Passsword")
        }

        const userId = user.id
        const name = user.name
        const email = user.email

        const accesToken = jwt.sign({userId, name, email}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '1h'})
        const refreshToken = jwt.sign({userId, name, email}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '1d'})

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        await Users.update({refresh_token: refreshToken},{where:{id: userId}})
        const userIP = req.connection.remoteAddress;
        traceLog.trace(`[Login] User Login Successful - IP: ${userIP}, Name : ${name}, Email : ${email}`)
        return jsonFormat(res, 200, "Login Successfully", {access_token: accesToken})
    }catch(err){
        console.log(err)
        errorLog.error(`at function userController(login) => ${err}`);
        next(err);
    }
}

exports.logout = async(req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return jsonFormat(res, 204)

    const user = await Users.findAll({where:{refresh_token: refreshToken}})
    if(!user[0]) return jsonFormat(res, 204)

    const userId = user[0].id
    const name = user[0].name
    await Users.update({refresh_token: null},{where:{id: userId}});
    res.clearCookie('refreshToken')

    traceLog.trace(`[Logout] User Logout Successful - Name : ${name}, UserId : ${userId}`)
    return jsonFormat(res, 200, "Good bye! See u!")
}