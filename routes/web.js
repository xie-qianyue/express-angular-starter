var express = require('express');
var router = express.Router();

// Solve the F5/Refresh problem.
// Remember : it should be the last call of ther router's GET method, otherwise it will intercept other GET methods.
router.get('/*', function (req, res) {
    res.sendFile('index.html', {
        // Go up to the 'public' foler 
        root: __dirname + '/../public/'
    });
});

module.exports = router;