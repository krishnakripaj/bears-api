const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const authenticationHandler = require("./middlewares/authentication");
const logHandler = require("./middlewares/logger");
const home = require("./routes/home");
const bears = require("./routes/bears");
const app = express();

app.use(cors()); // to stop cors errors
app.use(express.json()); // Parse JSON objects in req
app.use(logHandler);
app.use(authenticationHandler);
app.use('/', home);
app.use('/api/bears', bears);

mongoose
    .connect("mongodb://localhost/beardb", {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log("Connected to db successfully ...."))
    .catch((err)=> console.log("Error has occured while connecting to db:", err));

app.listen(5000, () => {
    console.log("Listening on Port 5000")
});