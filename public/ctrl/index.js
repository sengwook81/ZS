/**
 * New node file
 */

app.controller('indexController',function ($scope) {
	$scope.myData = 'Hello World';	
	console.log('Init Controller' , $scope);
});
console.log("???",app);