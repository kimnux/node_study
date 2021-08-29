var express = require('express');
// var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nodedb',
    user     : 'nodeman',
    password : '123456'
});

connection.connect();

router.get('/', function(req, res){
    res.render('join.ejs');
});

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function (req, email, password, done) {
        console.log('local-join callback called');
    })
);

// router.post('/', function(req, res){
//     let body = req.body;
//     let email = body.email;
//     let name = body.name;
//     let password = body.password;

//     console.log({email,name,password});

//     let sql = {email, name, pwd : password};
//     let query = connection.query('insert into user set ?', sql, function(err,rows) {
//         if(err) throw err;
//         else res.render('welcome.ejs', {name, id:rows.insertId});
//     });
// });


module.exports = router;