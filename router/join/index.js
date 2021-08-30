var express = require('express');
// var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'nodedb',
    user     : 'nodeman',
    password : '123456'
});

connection.connect();

router.get('/', function(req, res){
    console.log('get join url');
    let msg;
    let errMsg = req.flash('error');
    if(errMsg) msg = errMsg;

    res.render('join.ejs', {'message':msg});
});

passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('passport session get id : ', id);
    done(null, id);
});

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd',
        passReqToCallback : true
    }, function (req, email, pwd, done) {
        // console.log('local-join callback called');
        let query = connection.query('select * from user where email=?',[email], function(err, rows) {
            if(err) return done(err);

            if(rows.length) { //failureRedirect
                console.log('존재하는 아이디입니다.');
                return done(null, false, {message : 'your email is already used'});
            }else { //successRedirect
                let data = {email, pwd};
                let query = connection.query('insert into user set ?', data, function(err, rows) {
                    if(err) throw err;
                    return done(null, {'email': email, 'id' : rows.insertId});
                });
            }
        });
    })
);

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true
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