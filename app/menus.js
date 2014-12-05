/**
 * New node file
 */
module.exports = function() {
	// 에러 핸들링
	global.withMenu = function(retData) {
		retData['menus'] = [ {
			title : 'Video',
			link : '/video'
		}, {
			title : 'Blog',
			link : '/blog'
		}, {
			title : 'Menu3',
			link : '/menu3'
		} ];
		return retData;
	};
}