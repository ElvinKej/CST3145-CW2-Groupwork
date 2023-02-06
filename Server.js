var express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const cors = require("cors");

var app = express();
app.use(cors());

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
            "price": "£100",
            "space": 3,
            "image": "Pictures/Maths.png"
        },
        {
            "id": 102,
            "subject": "English",
            "location": "London",
            "price": "£100",
            "space": 7,
            "image": "Pictures/English.png"
        },
        {
            "id": 103,
            "subject": "Science",
            "location": "Oxford",
            "price": "£100",
            "space": 10,
            "image": "Pictures/Science.png"
        },
        {
            "id": 104,
            "subject": "History",
            "location": "Manchester",
            "price": "£150",
            "space": 6,
            "image": "Pictures/History.png"
        },
        {
            "id": 105,
            "subject": "Geography",
            "location": "London",
            "price": "£80",
            "space": 6,
            "image": "Pictures/Geography.png"
        },
        {
            "id": 106,
            "subject": "Music",
            "location": "Oxford",
            "price": "£90",
            "space": 22,
            "image": "Pictures/Music.png"
        },
        {
            "id": 107,
            "subject": "Spanish",
            "location": "Liverpool",
            "price": "£90",
            "space": 47,
            "image": "Pictures/Spanish.png"
        },
        {
            "id": 108,
            "subject": "French",
            "location": "Birmingham",
            "price": "£125",
            "space": 4,
            "image": "Pictures/French.png"
        },
        {
            "id": 109,
            "subject": "Art",
            "location": "Brighton",
            "price": "£140",
            "space": 10,
            "image": "Pictures/Art.png"
        },
        {
            "id": 110,
            "subject": "Economics",
            "location": "Sheffield",
            "price": "£125",
            "space": 13,
            "image": "Pictures/Economics.png"
        }
    ];
    res.json(products);
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});