var express = require('express');
// var app = express();
var router = express.Router();
var path = require('path');

// url routing
router.get('/', function(req, res) {
    console.log('main.js');
    res.sendFile(path.join(__dirname,"../public/main.html"));
});

module.exports = router;