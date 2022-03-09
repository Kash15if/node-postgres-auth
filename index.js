const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

//importing db-connection query
const pool = require("./Config/dbcon");

app.use(express.urlencoded());

//connection method for database connection everytime server starts
pool.connect().then((row) => {
  console.log("db is connected :", row._connected);
});

// var token = jwt.sign({ foo: "bar" }, "shhhhh");

app.get("/", async function (req, res) {
  var token = jwt.sign({ name: "Kashif_" }, "shhhhh");

  const salt = await bcrypt.genSalt();

  const passhash = await bcrypt.hash("Kashif", salt);

  const comp = await bcrypt.compare("Kashif", passhash);

  if (comp) console.log("Password Matched");

  console.log(passhash);

  const out = await pool.query("SELECT personid, name FROM public.test1;");
  // return out;

  console.log(out.rows);

  res.send(out.rows);
});

//authorization for api data by passing token in header
app.get("/checkHeader", async function (req, res) {
  console.log(req.headers);

  const jwttoken = req.headers.authorization;
  const TokenArray = jwttoken.split(" ");

  console.log(TokenArray[1]);
  const decoded = jwt.decode(TokenArray[1]);

  console.log(decoded);
  const person = decoded;
  res.send(`username is ${person.name}`);
});

app.listen(3000);
