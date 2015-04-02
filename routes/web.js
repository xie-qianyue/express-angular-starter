var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

// to solve the F5/Refresh problem
router.get('*', function (req, res) {
    res.sendFile('index.html', {
        // go up to the 'public' foler 
        root: __dirname + '/../public/'
    });
});

module.exports = router;