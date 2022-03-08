const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");
// var token = jwt.sign({ foo: "bar" }, "shhhhh");

app.get("/", async function (req, res) {
  var token = jwt.sign({ foo: "bar" }, "shhhhh");

  const salt = await bcrypt.genSalt();

  const passhash = await bcrypt.hash("Kashif", salt);

  const comp = await bcrypt.compare("Kashif", passhash);

  if (comp) console.log("Password Matched");

  console.log(passhash);

  res.send(token);
});

app.listen(3000);
