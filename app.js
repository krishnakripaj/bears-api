const express = require('express');
const authenticationHandler = require("./middlewares/authentication");
const logHandler = require("./middlewares/logger");
const home = require("./routes/home");
const bears = require("./routes/bears");
const app = express();

app.use(express.json()); // Parse JSON objects in req
app.use(logHandler);
app.use(authenticationHandler);
app.use('/', home);
app.use('/api/bears', bears);

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});