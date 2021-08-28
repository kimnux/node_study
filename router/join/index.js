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

router.post('/', function(req, res){
    let body = req.body;
    let email = body.email;
    let name = body.name;
    let password = body.password;

    console.log({email,name,password});

    let sql = {email, name, pwd : password};
    let query = connection.query('insert into user set ?', sql, function(err,rows) {
        if(err) {throw err;}
        console.log('ok db insert');
    });
});


module.exports = router;