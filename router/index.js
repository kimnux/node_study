var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var main = require('./main/main.js');
var email = require('./email/email.js');

// url routing
router.get('/', function(req, res) {
    console.log('index.js / path loaded');
    res.sendFile(path.join(__dirname,"../public/main.html"));
});

router.use('/main',main);
router.use('/email_post',email);

module.exports = router;