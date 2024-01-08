const log4js = require('log4js');
const errorLog = log4js.getLogger("error");
const traceLog = log4js.getLogger("trace");
const axios = require('axios');

const { jsonFormat } = require('../utils/jsonFormat')
const Users = require('../models/userModels');

exports.getTokenOTP = async(req, res, next) => {
    let data = JSON.stringify({
        "username": "meryn@ecampus.ut.ac.id",
        "password": "Password123!",
        "grant_type": "password",
        "client_id": "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
        "client_secret": "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
    })

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'https://chat-service.qontak.com/oauth/token',
        url: 'https://service-chat.qontak.com/api/open/v1/oauth/token',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    let token
    try {
        await axios.request(config)
        .then((response) => {
            const otpToken = response.data.access_token;
            Users.update({ otp_token: otpToken }, { where: { id: req.userId } })
            token = otpToken
            traceLog.trace(`[Login] Login WA API Successful - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
        })

        return token
    }catch(err){
        console.log(err)
        errorLog.error(`at function OTPController(getTokenOTP) => ${err}`);
        next(err);
    }
}

exports.otpmessage = async(req, res, next) => {
    //* Declare variable
    const kode_otp = req.body.kode_otp
    const no_hapex = req.body.no_hape
    let no_hp
    if (no_hapex.substring(0, 2) === '62') {
        no_hp = no_hapex;
    } else {
        no_hp = no_hapex.replace(/^0/, '62');
    }
    
    //* checking token for wa 
    const cek = await Users.findOne({where: {id: req.userId}})
    let otpToken
    if(!cek.otp_token){
        otpToken = await this.getTokenOTP(req, res)
    }else{
        otpToken = cek.otp_token
    }

    //* Preparing data to send wa api
    let data = JSON.stringify({
        "to_name": "Penerima",
        "to_number": `${no_hp}`,
        "message_template_id": "669642a8-f7b5-4436-98cc-21f8155a8096",
        "channel_integration_id": "6e7d4957-c061-4723-a79b-69afb1e249a8",
        "language": {
            "code": "id"
        },
        "parameters": {
            "body": [
            {
                "key": "1",
                "value_text": `${kode_otp}`,
                "value": "kode_otp"
            }
            ]
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: 'https://chat-service.qontak.com/api/open/v1/broadcasts/whatsapp/direct',
        url: 'https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${otpToken}`
        },
        data : data
    };

    //* send the prepared data
    try {
        await axios.request(config)
        .then((response) => {
            const status = response.data.status;
            if(status === 'success'){
                traceLog.trace(`[WA MESSAGE] sending WA message was successful - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
                return jsonFormat(res, 200, "OTP code was sent")
            }else{
                return jsonFormat(res, 500, `${response.messages}`)
            }
        })
    }catch(err){
        console.log(err)
        errorLog.error(`at function OTPController(otpmessage) => ${err}`);
        next(err);
    }
}