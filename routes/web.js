var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

// to solve the F5/Refresh problem
// remember : it should bt the last call of ther router's GET method, otherwise it will intercept other GET methods
router.get('/*', function (req, res) {
    res.sendFile('index.html', {
        // go up to the 'public' foler 
        root: __dirname + '/../public/'
    });
});

module.exports = router;