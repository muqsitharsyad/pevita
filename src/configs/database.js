const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
  }
);

const dbNadine = new Sequelize(
  process.env.DB_DATABASE_NADINE,
  process.env.DB_USERNAME_NADINE,
  process.env.DB_PASSWORD_NADINE,
  {
    host: process.env.DB_HOST_NADINE,
    port: process.env.DB_PORT_NADINE,
    dialect: process.env.DB_CONNECTION_NADINE,
  }
);

db.authenticate().then(() => {
    console.log('Connected to Database');
}).catch(err => {
    console.error('Could not connect to Database', err);
});

dbNadine.authenticate().then(() => {
    console.log('Connected to Database Nadine');
}).catch(err => {
    console.error('Could not connect to Database Nadine', err);
});

module.exports = { db, dbNadine };