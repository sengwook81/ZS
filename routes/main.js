module.exports = function(app) {
	// 메이페이지 지정
	var blogArticle = require("../app/db/database")(app);
		
	app.get('/blog/update/:id',function(req, res) {
		console.log("Blog",req.params.user,req.params.content);
		var moment = require('moment');
		blogArticle.find().limit(3).sort({'regdt':-1}).exec(function (arr,data) {
			console.log(data);
			res.render('blog', withMenu({
				
				title : 'Index',
				type : 'edit',
				article : {
					id : '',
					title : 'NEW TITLE',
					content : '<DIV> HELLO WORLD</DIV>',
					public : 'false',
					regdt : new Date(),
					uptdt : new Date()
				},
				moment : moment
			}));

		});		
	});
	
	app.get('/blog',function(req, res) {
		console.log("Blog",req.params.user,req.params.content);
		blogArticle.find().limit(3).sort({'regdt':-1}).exec(function (arr,data) {
			console.log(data);
			var moment = require('moment');
			res.render('blog', withMenu({
				title : 'Index',
				type : 'display' ,
				articles : data ,
				moment : moment
			}));

		});		
	});
	app.get('/blog/:user/',function(req, res) {
		console.log("Blog",req.params.user,req.params.content);
		res.render('blog', withMenu({
			title : 'Blog'
		}));
	});
	app.get('/blog/:user/:content', function(req, res) {
		console.log("Blog",req.params.user,req.params.content);
		res.render('blog', withMenu({
			title : 'Blog'
		}));
	});
	
	app.get('/video', function(req, res) {
		res.render('video', withMenu({
			title : 'Video'
		}));
	});
	app.post('/blog' , function (req,res) {
		console.log(blogArticle);
		
		blogArticle.find().limit(3).sort({'regdt':-1}).exec(function (arr,data) {
			console.log(data);
			
			res.send(data);
		});
	});
	
	
	app.put('/blog' , function (req,res) {
		
		console.log(req.body);
		var model = new blogArticle();
		model.apply(req.body);
		model.regdt = new Date();
		model.uptdt = new Date();
		model.save();
		
		res.send({rslt:'success'});
	});
	
	app.get('/err', function(req, res) {
		throw new ZException("ERROR");
	});
	
	app.get('/', function(req, res) {
		console.log("ERNDER INDEX");
		console.log(blogArticle);
		res.render('index', withMenu({
			title : 'index'
		}));
	});
}