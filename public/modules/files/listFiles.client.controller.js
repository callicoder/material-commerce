'use strict';

angular.module('materialApp')
.controller('listFilesController', ['$scope', 'filesService', function($scope, filesService){
	filesService.listFiles()
	.then(function(response){
		console.log(response.data);
		$scope.files = response.data;
	});
}]);