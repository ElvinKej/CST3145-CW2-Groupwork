const express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);

let dbPrefix = properties.get("db.prefix");
//URL-Encoding of User and PWD
//for potential special characters
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");

const uri = dbPrefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://WebStoreUser:<password>@webstorecluster.4nydb5v.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const { MongoClient, ServerApiVersion, OBjectId } = require("mongodb");
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);

var app = express();
app.use(cors());

app.set('json spaces', 1);

app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

app.use(function (req, res, next) {
    console.log("incoming request" + req.url);
    next();
});

app.get("/", function(req, res) {
    res.send("Welcome to our server");
});

app.get('/collections/:collectionName', function(req, res, next) { 
    req.collection.find({}).toArray(function (err, results) {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
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

// app.get("/lessons", function(req, res) {
//     let lessons = [
//         {
//             "topic": "Math", 
//             "location" : "Hendon",
//             "price" : " 100"
//         },
//         {
//             "topic": "Math", 
//             "location" : "Colindale",
//             "price" : " 80"
//         },
//         {
//             "topic": "Math", 
//             "location" : "Brent Cross",
//             "price" : " 90"
//         },
//         {
//             "topic": "Math", 
//             "location" : "Golders Green",
//             "price" : " 120"
//         },
//     ]
//     res.json(lessons);
// });

app.get("/lessons", function(req, res) {
    //res.send("Successfully called");

    let products = [
        {
            "id": 101,
            "subject": "Math",
            "location": "London",
            "price": "??100",
            "space": 3,
            "image": "Pictures/Maths.png"
        },
        {
            "id": 102,
            "subject": "English",
            "location": "London",
            "price": "??100",
            "space": 7,
            "image": "Pictures/English.png"
        },
        {
            "id": 103,
            "subject": "Science",
            "location": "Oxford",
            "price": "??100",
            "space": 10,
            "image": "Pictures/Science.png"
        },
        {
            "id": 104,
            "subject": "History",
            "location": "Manchester",
            "price": "??150",
            "space": 6,
            "image": "Pictures/History.png"
        },
        {
            "id": 105,
            "subject": "Geography",
            "location": "London",
            "price": "??80",
            "space": 6,
            "image": "Pictures/Geography.png"
        },
        {
            "id": 106,
            "subject": "Music",
            "location": "Oxford",
            "price": "??90",
            "space": 22,
            "image": "Pictures/Music.png"
        },
        {
            "id": 107,
            "subject": "Spanish",
            "location": "Liverpool",
            "price": "??90",
            "space": 47,
            "image": "Pictures/Spanish.png"
        },
        {
            "id": 108,
            "subject": "French",
            "location": "Birmingham",
            "price": "??125",
            "space": 4,
            "image": "Pictures/French.png"
        },
        {
            "id": 109,
            "subject": "Art",
            "location": "Brighton",
            "price": "??140",
            "space": 10,
            "image": "Pictures/Art.png"
        },
        {
            "id": 110,
            "subject": "Economics",
            "location": "Sheffield",
            "price": "??125",
            "space": 13,
            "image": "Pictures/Economics.png"
        }
    ];
    res.json(products);
});

// app.listen(3000, function() {
//     console.log("App started on port 3000");
//});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App started on port: " + port);
});