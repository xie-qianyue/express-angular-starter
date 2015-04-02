var express = require('express');
var errorHandler = require('errorhandler');

// make it easy to test
var app = module.exports = express();
var webRouter = require('./routes/web');

app.set('port', process.env.PORT || 3000);

// serve the static files
app.use(express.static('public'));

app.use('/', webRouter);


// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});