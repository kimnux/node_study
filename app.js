var express = require('express');
var app = express();

app.listen(3000, function() {
    console.log("start! express server on port 3000");
});

app.use(express.static('public'));

// [기존 body-parser을 install해야했지만 express버전 4.16.0 - Release date: 2017-09-28 부터 express에 추가됨]
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ejs 사용시
app.set('view engine', 'ejs');
// pug 사용시
app.set('view engine', 'pug');


// url routing
app.get('/', function(req, res) {
    res.sendFile(__dirname+"/public/main.html");
});

app.post('/email_post/ejs', function(req, res){
    console.log("email:", req.body.email);
    res.render('email.ejs', { 'email' : req.body.email }); // ejs
});

app.post('/email_post/pug', function(req, res){
    console.log("email:", req.body.email);
    res.render('email.pug', { 'email' : req.body.email });
});

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email);
    let responseData = {'success_yn':true, 'email':req.body.email};
    res.json(responseData);
});

app.post('/ajax_send_search', function(req, res) {
    console.log(req.body.data);
    let responseData = {};
    try {
        responseData = {'success_yn':true, 'data':req.body.data}
    } catch (error) {
        console.log(error);
        responseData = {'success_yn':false}
    }
    res.json(responseData);
})