const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const authApi = require("./APIs/AuthApi");

//importing db-connection query
const pool = require("./Config/dbcon");

app.use(express.urlencoded());
app.use("/auth", authApi);

//connection method for database connection everytime server starts
pool.connect().then((row) => {
  console.log("db is connected :", row._connected);
});

app.listen(3000);
