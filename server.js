var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser'); // Request Body Parser Import (application/json)
var multer = require('multer'); // Request Body Parser Import (multipart/form-data)
var morgan = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var port  	 = process.env.PORT || 12080; 	

app.set('title', 'My Site');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// Body parser 등록
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended : true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(methodOverride()); // delete and put method override

console.log("Zero Server Ready Listen Port ["+port+"]");
// 인터프리터 방식이다보니 순서가 중요함.

require('./app/main.js')(app);

//DB 초기화 처리
mongoose.connect('mongodb://localhost/zero', function(err) {
	if (err) {
		console.log('mongoose connection error :' + err);
		throw err;
	}

	console.log("MongoDb Connected");
	app.listen(port);
	
});
