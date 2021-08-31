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

    res.render('login.ejs', {'message':msg});
});

passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('passport session get id : ', id);
    done(null, id);
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd',
        passReqToCallback : true
    }, function (req, email, pwd, done) {
        console.log('local-login callback called');
        let query = connection.query('select * from user where email=? and pwd=?',[email, pwd], function(err, rows) {
            if(err) return done(err);

            if(rows.length) { 
                return done(null, {'email': email, 'id' : rows[0].idx});
            }else { 
                return done(null, false, {message : 'your login info is not found.'});
            }
        });
    })
);

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.login(user, function(err) {
            if(err) {return next(err);}
            return res.json(user);
        });
    })(req, res, next);
});


module.exports = router;