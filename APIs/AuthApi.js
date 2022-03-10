const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

router.get("/", (req, res) => {});

router.post("/register", async (req, res) => {
  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);

      let newUser = {
        id: Date.now(),
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      };
      users.push(newUser);
      console.log("User list", users);

      res.send();
    } else {
      res.send();
    }
  } catch {
    res.send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        let usrname = foundUser.username;
        res.send();
      } else {
        res.send();
      }
    } else {
      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
      await bcrypt.compare(req.body.password, fakePass);

      res.send();
    }
  } catch {
    res.send("Internal server error");
  }
});

module.exports = router;

/*
For testing purpose

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

*/
