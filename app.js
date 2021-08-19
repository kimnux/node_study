var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

app.use(express.static('public'));

// [기존 body-parser을 install해야했지만 express버전 4.16.0 - Release date: 2017-09-28 부터 express에 추가됨]
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// url routing
app.get('/', function(req, res) {
    res.sendFile(__dirname+"/public/main.html");
});

app.post('/email_post', function(req, res){
    console.log("email:", req.body.email);
    res.send("<h1>welcome " + req.body.email + "!</h1>");
});