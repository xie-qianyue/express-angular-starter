var express = require('express');
var app = express();

// serve the static files
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

// to solve the F5/Refresh problem
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000);