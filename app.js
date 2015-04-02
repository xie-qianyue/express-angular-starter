var express = require('express');
var errorHandler = require('errorhandler');

// make it easy to test
var app = module.exports = express();

app.set('port', process.env.PORT || 3000);

// serve the static files
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

// to solve the F5/Refresh problem
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});