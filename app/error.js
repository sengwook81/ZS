/**
 * New node file
 */
module.exports = function(app, sys) {
	// 에러 핸들링
	console.log("INIT ERROR MODULE");
	global.ZException = function(msg) {
		this.name = 'ZException';
		Error.call(this, msg);
		Error.captureStackTrace(this, arguments.callee);
	}

	sys.inherits(ZException, Error);

	app.use(function(err, req, res, next) {
		console.log("ERROR HANDLER",err);
		if (err instanceof ZException) {
			res.render('error', withMenu({
				status : 404
			}));
		} else {
			next(err);
		}
	});

	app.use(function(err, req, res, next) {
		res.render('error', withMenu({
			status : 500,
			locals : {
				error : err
			}
		}));
	});
	console.log("FINISH ERROR MODULE");
}