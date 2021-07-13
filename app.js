const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON objects in req

let bearArray = [
    {id:1, name:"Grizzly Bear", type:"Scary", place:"Scandinavian Countries"},
    {id:2, name:"Polar Bear", type:"Cute", place:"Polar Regions"},
    {id:3, name:"Sloth Bear", type:"Lazy", place:"All over"}
];

app.get("/", (req,res) => {
    res.send("Hello Everyone, welcome to the class!");
});

// GET ALL 
app.get("/api/bears", (req, res) => {
    res.send(bearArray);
});

// GET With Params
app.get("/api/bears/:bearId", (req, res) => {
    let bearId = req.params.bearId;
    let bear = bearArray.find(b=>b.id == bearId);
    if (!bear){
        return res.status(404).send("Given ID does not exist");
    }
    res.send(bear);
});

// POST
app.post("/api/bears", (req, res) => {

    if (!req.body.name) {
        return res.status(400).send("Not all mandatory values are sent");
    }

    let newBearObj = {
        id: bearArray.length + 1,
        name: req.body.name,
        type: req.body.type,
        place: req.body.place 
    }
    bearArray.push(newBearObj);
    res.send(newBearObj);
});

// PUT
app.put("/api/bears/:bearId", (req, res) => {
    let bear = bearArray.find(b=>b.id == req.params.bearId);
    if (!bear) {
        return res.status(404).send("The given ID does not exist");
    }

    bear.name = req.body.name;
    res.send(bear);
});

// DELETE 
app.delete('/api/bears/:bearId', (req, res) => {
    let bear = bearArray.find(b=>b.id == req.params.bearId);
    if (!bear) {
        return res.status(404).send("The given ID does not exist");
    }

    let index = bearArray.indexOf(bear);
    bearArray.splice(index, 1);

    res.send(bear);
});

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});