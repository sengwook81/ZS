zeroApp = angular.module('zeroApp', [ 'ngRoute','angularFileUpload' ]);
zeroApp.controller('HomeController',
		function($scope, $route, $routeParams, $location) {
			// $scope.$route = $route;
			// $scope.$location = $location;
			// $scope.$routeParams = $routeParams;
		}).controller('VideoController', function($scope, $routeParams) {
	$scope.name = "VideoController";
	$scope.params = $routeParams;
})

.controller('SocialController', function($scope, $routeParams) {
	$scope.name = "SocialController";
	$scope.params = $routeParams;
})
.controller('ManageController', function($scope, FileUploader) {
	$scope.name = "ManageController";
	var uploader = $scope.uploader = new FileUploader({
        url: '/upload/image'
    });
    // FILTERS
	console.log("LOAD ManageController");
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
        	console.log("FILTER ITEM",item,options);
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
	
})
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/video', {
		templateUrl : 'view/video.html',
		controller : 'VideoController',
		resolve : {
			// I will cause a 1 second delay
			delay : function($q, $timeout) {
				var delay = $q.defer();
				$timeout(delay.resolve, 1000);
				return delay.promise;
			}
		}
	}).when('/social', {
		templateUrl : 'view/social.html',
		controller : 'SocialController'
	}).when('/manage', {
		templateUrl : 'view/manage.html',
		controller : 'ManageController'
	}).otherwise({
		redirectTo : '/',
		templateUrl : 'view/home.html',
		controller : 'HomeController'
	});

	// configure html5 to get links working on jsfiddle
	//$locationProvider.html5Mode(true);
});