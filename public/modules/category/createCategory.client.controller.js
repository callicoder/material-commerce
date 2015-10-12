'use strict';

angular.module('materialApp')
.controller('createCategoryController', ['$scope', 'categoryService', function($scope, categoryService){
	$scope.category = {};

	$scope.createCategory = function() {
		categoryService.createCategory($scope.category, $scope.file)
		.then(function(response){
			console.log(response);
		}, function(error) {
			console.log(error);
		});
	};

}]);