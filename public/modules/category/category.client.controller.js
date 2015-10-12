'use strict';

angular.module('materialApp')
.controller('categoryController', ['$scope', '$stateParams', 'categoryService', function($scope, $stateParams, categoryService){
		if($stateParams.categoryId) {
			$scope.parentCategory = $stateParams.categoryId;
		}

		categoryService.getTopLevelCategories()
		.then(function(response){
			$scope.categories = response.data;
		}, function(error){
			console.log(error);
		});
}]);
