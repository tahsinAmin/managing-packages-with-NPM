var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();
var bodyParser = require('body-parser');

// --> 7) Mount the Logger middleware here

app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
});

// --> 11 Mount the body-parser middleware here

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 1) Meet the node console.
console.log("Hello World");
bGround.log("Hello World");

// 2) A first working Express Server


// 3) Serve an html file.

app.get("/", function(req,res){
    res.sendFile(__dirname + "/views/index.html");
});

// 4) Serve the static assets

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

// 5) serve JSON on a specific routes

// app.get("/json", function(req, res){
//     res.json(
//         { "message": "Hello json" }
//     );
// });



// 6) Use the .env file to configure the app

app.get("/json", function(req,res){
    var jsonResponse = { "message": "Hello json"};

    if(process.env.MESSAGE_STYLE=="uppercase"){
        jsonResponse.message = jsonResponse.message.toUpperCase()
    }

    res.json(jsonResponse);
});





// 8) chaining Middleware. A time server

function getTheCurrentTimeString(){
    return new Date().toString();
}

app.get("/now", (req, res, next) => {
    req.time = getTheCurrentTimeString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});

// 9) Get input from client - Route parameters

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word })
});

// 10) Get input from Client - Query parameters
// /name?first=<firstname>&<lastname>

app.get("/name", (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last});
});

 module.exports = app;

// 12) Get data from POST

app.post("/name", (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last});
});
