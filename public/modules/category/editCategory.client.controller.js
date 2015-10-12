'use strict';

angular.module('materialApp')
.controller('editCategoryController', ['$scope', '$stateParams', 'categoryService', function($scope, $stateParams, categoryService){

		categoryService.getCategory($stateParams.categoryId)
		.then(function(response){
			$scope.category = response.data;
		}, function(error) {
			console.log(error);
		});

		$scope.editCategory = function() {
			categoryService.updateCategory($scope.category)
			.then(function(response){
				$scope.category = response.data;
			}, function(error){
				console.log(error);
			});
		};
}]);
