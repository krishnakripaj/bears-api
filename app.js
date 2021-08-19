const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const authenticationHandler = require("./middlewares/authentication");
const logHandler = require("./middlewares/logger");
const home = require("./routes/home");
const bears = require("./routes/bears");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

app.use(cors()); // to stop cors errors
app.use(express.json()); // Parse JSON objects in req
app.use(logHandler);
app.use(authenticationHandler);
app.use('/', home);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bears', bears);

mongoose
    .connect("mongodb+srv://admin:admin@cluster0.xrudi.mongodb.net/bearsdb?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log("Connected to db successfully ...."))
    .catch((err)=> console.log("Error has occured while connecting to db:", err));

const PORT = process.env.PORT;    
app.listen(PORT, () => {
    console.log("Listening on Port" + PORT);
});