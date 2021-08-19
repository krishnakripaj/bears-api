const express = require("express");
const jwt = require("jsonwebtoken");
const Bear = require("../models/bear");
const router = express.Router();

const SECRET_KEY = "123456789";

// GET ALL
router.get("/", async (req, res) => {
  try {
    let bears = await Bear.find().sort({ name: "desc" });
    res.send(bears);
  } catch (ex) {
    return res.status(500).send("Error", ex.message);
  }
});

// GET With Params
router.get("/:bearId", async (req, res) => {
  let bearId = req.params.bearId;

  let bear = await Bear.findById(bearId);

  if (!bear) {
    return res.status(404).send("Given ID does not exist");
  }
  res.send(bear);
});

// POST
router.post("/", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) {
    return res.status(401).send("Access denied. No token available");
  }
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }

  if (!req.body.name) {
    return res.status(400).send("Not all mandatory values are sent");
  }

  let bear = new Bear({
    name: req.body.name,
    type: req.body.type,
    movies: req.body.movies,
    likeCount: req.body.likeCount,
    imgUrl: req.body.imgUrl,
    isScary: req.body.isScary,
  });

  bear = await bear.save();
  res.send(bear);
});

// PUT
router.put("/:bearId", async (req, res) => {
  let bear = await Bear.findById(req.params.bearId);
  if (!bear) {
    return res.status(404).send("The given ID does not exist");
  }

  bear.set({ likeCount: req.body.likeCount });
  bear = await bear.save();
  res.send(bear);
});

// DELETE
router.delete("/:bearId", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) {
    return res.status(401).send("Access denied. No token available");
  }
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }

  let decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded.isAdmin) {
    return res.status(403).send("Forbidden - no authorization available");
  }

  let bear = await Bear.findOneAndDelete({ _id: req.params.bearId });
  if (!bear) {
    return res.status(404).send("The given ID does not exist");
  }
  res.send(bear);
});

module.exports = router;
