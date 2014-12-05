module.exports = function(app) {
	mongoose = require('mongoose')
	var db = mongoose.connect('mongodb://localhost/blogArticle', function(err) {
		if (err) {
			console.log('mongoose connection error :' + err);
			throw err;
		}
	});

	var schArticle = new mongoose.Schema({
		title : String,
		content : String,
		public : Boolean,
		uptdt : Date,
		regdt : Date
	});
	
	schArticle.methods.apply = function (data) {
		for(var x in data) {
			this[x]= data[x];
		}
	};
	var article = mongoose.model('article', schArticle);
	return article;
}