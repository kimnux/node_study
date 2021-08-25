var express = require('express');
// var app = express();
var router = express.Router();
// var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nodedb',
    user     : 'nodeman',
    password : '123456'
});

connection.connect();

router.post('/ejs', function(req, res){
    console.log("email:", req.body.email);
    res.render('email.ejs', { 'email' : req.body.email }); // ejs
});

router.post('/pug', function(req, res){
    console.log("email:", req.body.email);
    res.render('email.pug', { 'email' : req.body.email });
});

router.post('/ajax_send_email', function(req, res){
    var email = req.body.email;
    var responseData = {};
    
    var query = connection.query('select name from user where email="' + email + '"', function (err, rows) {
        if(err) throw error;
        
        if( rows[0] ) {
            console.log('email : ', rows[0]);
            responseData.success_yn = true;
            responseData.name = rows[0].name;
        }else {
            responseData.success_yn = false;
        }

        res.json(responseData);
    });
});

router.post('/ajax_send_search', function(req, res) {
    console.log(req.body.data);
    let responseData = {};
    try {
        responseData = {'success_yn':true, 'data':req.body.data}
    } catch (error) {
        console.log(error);
        responseData = {'success_yn':false}
    }
    res.json(responseData);
});

module.exports = router;