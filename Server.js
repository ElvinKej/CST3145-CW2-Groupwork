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

app.get("/", function(req, res) {
    res.send("Welcome to our server");
});

app.get("/user", function(req, res) {
    // res.send("The service has been called correctly");
    let user =
        {
            "email": "user@gmail.com", 
            "password" : "mypassword"
        }
    
    res.json(user);
});