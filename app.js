const express = require('express');
const app     = express();
global.__basedir = __dirname;
const cors       = require('cors');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http       = require('http');
const log4js     = require("log4js");

const routes       = require('./src/routes');
const {db}         = require("./src/configs/database");
const logger       = require("./src/middleware/logger");
const notFound     = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
// ROUTE
app.use(routes);
// NOT FOUND ROUTES
app.use(notFound);
// LOGGER
log4js.configure(logger);
//ERROR HANDLER
app.use(errorHandler);

//force: true -> untuk migrate db dengan data kosong
db.sync({})
.then(
    app.listen(process.env.NODE_PORT, () => {
        console.log("Server is running on PORT " + process.env.NODE_PORT);
    })
).catch(err => {
    console.log(err)
})