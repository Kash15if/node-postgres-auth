const { Pool } = require("pg");
require("dotenv").config();

//new pool creation using environment variable
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORTDB,
  database: process.env.DATABASENAME,
});

module.exports = pool;
