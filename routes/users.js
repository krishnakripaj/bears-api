const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/user");

router.post("/", async (req, res) => {
  try {

    let salt = await bcrypt.genSalt(10);
    let pw = req.body.password;
    let hashedpw = await bcrypt.hash(pw.toString(), salt)

    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpw,
      isAdmin: req.body.isAdmin,
    });
    user = await user.save();
    return res.send({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
module.exports = router;
