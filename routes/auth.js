const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const SECRET_KEY = "123456789";

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid credentials. Please create an account with us");
    }
    let pwValid = await bcrypt.compare(req.body.password.toString(), user.password);
    if (!pwValid) {
      return res.status(400).send("Invalid password");
    }
    let token = jwt.sign({id: user._id, email: user.email, isAdmin: user.isAdmin}, SECRET_KEY, {
        expiresIn: "2d" // expire in 2 days
    });
    res.send({token: token});

  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
