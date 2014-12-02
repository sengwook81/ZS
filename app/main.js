module.exports = function(app) {
	// 메이페이지 지정
	app.use('/about', function(req, res) {
		console.log("ASDASDASDASD");
	});
	app.post('/upload/image', function(req, res) {
		console.log("HELLO?", req);

		res.sendHeader(200, {
			'Content-Type' : 'text/plain'
		});
		res.sendBody('Thanks for playing!');
		res.finish();

	});
	app.use('/*', function(req, res) {
		console.log("HELLO?");
		res.sendfile('./public/base.html');
	});
}