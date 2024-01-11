const log4js = require('log4js');
const errorLog = log4js.getLogger("error");
const traceLog = log4js.getLogger("trace");
const axios = require('axios');

const { jsonFormat } = require('../utils/jsonFormat')

exports.index = async(req, res, next) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_TOKEN}/latest/USD`
    }

    try {
        await axios.request(config)
        .then((response) => {
            const data = response.data;
            if(data.result === 'success'){
                traceLog.trace(`[CURRENCY] Get all currency - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
                return jsonFormat(res, 200, "Conversion rate all currency", {"time_last_update_utc": data.time_last_update_utc, "conversion_rates": data.conversion_rates})
            }else{
                return jsonFormat(res, 500, `${response.messages}`)
            }
        })
    }catch(err){
        console.log(err)
        errorLog.error(`at function currencyController(index) => ${err}`);
        next(err);
    }
}

exports.codes = async(req, res, next) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_TOKEN}/codes`
    }

    try {
        await axios.request(config)
        .then((response) => {
            const data = response.data;
            if(data.result === 'success'){
                traceLog.trace(`[CURRENCY] Get all supported code - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
                return jsonFormat(res, 200, "All supported code", data.supported_codes)
            }else{
                return jsonFormat(res, 500, `${response.messages}`)
            }
        })
    }catch(err){
        console.log(err)
        errorLog.error(`at function currencyController(codes) => ${err}`);
        next(err);
    }
}

exports.conversion = async(req, res, next) => {
    const base_code = req.body.base_code
    const target_code = req.body.target_code
    const amount = req.body.amount

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_TOKEN}/pair/${base_code}/${target_code}/${amount}`
    }

    try {
        await axios.request(config)
        .then((response) => {
            const data = response.data;
            if(data.result === 'success'){
                traceLog.trace(`[CURRENCY] Conversion - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
                return jsonFormat(res, 200, "Conversion result", {"base_code": data.base_code, 
                                                                    "target_code": data.target_code, 
                                                                    "amount": amount, 
                                                                    "time_last_update_utc": data.time_last_update_utc, 
                                                                    "conversion_result": data.conversion_result})
            }else{
                return jsonFormat(res, 500, `${response.messages}`)
            }
        })
    }catch(err){
        console.log(err)
        errorLog.error(`at function currencyController(conversion) => ${err}`);
        next(err);
    }
}

exports.quota = async(req, res, next) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_TOKEN}/quota`
    }

    try {
        await axios.request(config)
        .then((response) => {
            const data = response.data;
            if(data.result === 'success'){
                traceLog.trace(`[CURRENCY] Check quota - IP: ${req.connection.remoteAddress}, id : ${req.userId}`)
                return jsonFormat(res, 200, "Quota Exchange Rate", {"plan_quota": data.plan_quota, "requests_remaining": data.requests_remaining, "refresh_day_of_month": data.refresh_day_of_month})
            }else{
                return jsonFormat(res, 500, `${response.messages}`)
            }
        })
    }catch(err){
        console.log(err)
        errorLog.error(`at function currencyController(codes) => ${err}`);
        next(err);
    }
}