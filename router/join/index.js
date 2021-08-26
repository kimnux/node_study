var express = require('express');
// var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nodedb',
    user     : 'nodeman',
    password : '123456'
});

connection.connect();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../../public/join.html'));
});




module.exports = router;