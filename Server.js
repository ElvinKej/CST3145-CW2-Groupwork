var express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const cors = require("cors");

var app = express();
app.use(cors());
// app.set.('json spaces', 0);
app.set('json spaces', 1);

app.use(function (req, res, next) {
    console.log("incoming request" + req.url);
    next();
});