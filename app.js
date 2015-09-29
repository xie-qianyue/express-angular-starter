var express = require('express');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');

// make it easy to test
var app = module.exports = express();
var webRouter = require('./routes/web');
// var api = require('./routes/api');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// serve the static files
app.use(express.static('public'));
// match the api url with a prefix '/api'
// app.use('/api', api);
app.use('/', webRouter);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});