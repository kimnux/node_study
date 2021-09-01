var express = require('express');
// var app = express();
var router = express.Router();
var path = require('path');

// url routing
router.get('/', function(req, res) {
    console.log('main.js loaded', req.user);
    let id = req.user;
    if(!id) res.render('login.ejs'); // 로그인을 안했을시 로그인 페이지로 이동되게끔
    // res.sendFile(path.join(__dirname,"../../public/main.html"));
    res.render('main.ejs', {'id' : id});
});

module.exports = router;