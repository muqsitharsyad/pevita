module.exports = (req, res, next) => {
    res.json({
      statusCode: 404,
      status: "Page Not Found",
    });
  };
  