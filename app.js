/**
 * Module dependencies.
 */

var express = require('express')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , favicon = require('static-favicon')
  , errorHandler = require('errorhandler')
  , methodOverride = require('method-override')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 12080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

require("./routes/main")(app);

app.use(function(req, res, next) {
	console.log("CORS ALLOW" , req);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
