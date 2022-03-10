const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

//importing db-connection query
const pool = require("../Config/dbcon");

router.get("/", (req, res) => {});

router.post("/register", async (req, res) => {
  let user = req.body;
  // console.log(user);
  try {
    let dbData = await pool.query(
      "SELECT userid, email, password FROM public.users where email = $1;",
      [user.email]
    );
    let foundUser = dbData.rows[0];

    // console.log(foundUser);
    // users.find((data) => req.body.email === data.email);

    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);

      let addUser = await pool.query(
        "INSERT INTO public.users( userid, email, password) VALUES (uuid_generate_v4(), $1, $2);",
        [user.email, hashPassword]
      );

      if (addUser.rowCount) {
        console.log("User add", addUser.rowCount);
      }

      res.send(user.email);
    } else {
      res.send("This user already exists, Please login with another email");
    }
  } catch {
    res.send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  let user = req.body;
  try {
    let dbData = await pool.query(
      "SELECT userid, email, password FROM public.users where email = $1;",
      [user.email]
    );
    let foundUser = dbData.rows[0];

    // console.log(foundUser);
    if (foundUser) {
      let submittedPass = user.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        let userEmail = foundUser.email;
        res.send(userEmail);
      } else {
        res.send("Wrong Password");
      }
    } else {
      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
      await bcrypt.compare(req.body.password, fakePass);

      res.send("No Such user exists");
    }
  } catch {
    res.send("Internal server error");
  }
});

module.exports = router;

/*

*/
