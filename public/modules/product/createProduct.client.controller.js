'use strict';

angular.module('materialApp')
.controller('createProductController', ['$scope', 'productService', function($scope, productService) {
	$scope.specs = [{}, {}];
	$scope.addMoreSpecs = function() {
		$scope.specs.push({});
	};

	$scope.removeSpec = function(index) {
		$scope.specs.splice(index, 1);
	};

}]);