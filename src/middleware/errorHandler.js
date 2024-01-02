module.exports = (err, req, res, next) => {
    const errCode = err.statusCode || 500;
    const errStatus = err.name || 'Internal server error';
    const errMsg = err.message || 'Something went wrong';
    res.status(errCode).json({
        statusCode: errCode,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'Development' ? err.stack : {}
    })
}