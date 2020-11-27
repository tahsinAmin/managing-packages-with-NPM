var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');







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






















 module.exports = app;
