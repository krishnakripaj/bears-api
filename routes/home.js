const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send("Hello Everyone, welcome to the class!");
});

module.exports = router;