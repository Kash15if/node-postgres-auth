const express = require("express");
const app = express();

var jwt = require("jsonwebtoken");
// var token = jwt.sign({ foo: "bar" }, "shhhhh");

app.get("/", function (req, res) {
  var token = jwt.sign({ foo: "bar" }, "shhhhh");

  console.log(token);

  res.send(token);
});

app.listen(3000);
