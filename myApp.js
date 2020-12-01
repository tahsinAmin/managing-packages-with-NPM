var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();

// --> 7) Mount the Logger middleware here

app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip)
    next();
});


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





 module.exports = app;
