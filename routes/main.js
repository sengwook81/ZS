module.exports = function(app) {
	// 메이페이지 지정
	app.get('/blog',function ( req , res) {
		console.log("ERNDER INDEX");
		res.render('blog', { title: 'blog' });
	});
	
	app.get('/',function ( req , res) {
		console.log("ERNDER INDEX");
		res.render('index', { title: 'blog' });
	});
	
}