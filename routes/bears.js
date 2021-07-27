const express = require("express");
const Bear = require("../models/bear");
const router = express.Router();

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

  bear.set({ likeCount: req.body.likeCount});
  bear = await bear.save();
  res.send(bear);
});

// DELETE
router.delete("/:bearId", async (req, res) => {
  let bear = await Bear.findOneAndDelete({_id: req.params.bearId});
    if (!bear){
        return res.status(404).send("The given ID does not exist");
    }
  res.send(bear);
});

module.exports = router;
