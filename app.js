var express = require('express');
var app = express();
var router = require('./router/index');
var cors = require('cors');

app.listen(3000, function() {
    console.log('CORS-enabled web server listening on port 3000')
});

app.use(express.static('public'));

// [기존 body-parser을 install해야했지만 express버전 4.16.0 - Release date: 2017-09-28 부터 express에 추가됨]
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// ejs 사용시
app.set('view engine', 'ejs');
// pug 사용시
app.set('view engine', 'pug');


// url routing
app.use(router);



