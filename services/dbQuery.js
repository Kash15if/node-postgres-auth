const express = require("express");
const app = express();
require("dotenv").config();

//importing db-connection query and crud query
const pool = require("./dbcon");
const { create, read, update, deleteOne } = require("./dbQuery");

app.use(express.urlencoded());

//connection method for database connection everytime server starts
pool.connect().then((row) => {
  console.log("db is connected :", row._connected);
});
