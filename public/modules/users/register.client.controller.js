'use strict';
angular.module('materialApp')
.controller('registerController', ['$scope', 'security', '$state', function($scope, security, $state){
	$scope.user = {};

	$scope.register = function() {
		security.register($scope.user)
		.success(function(data){
			console.log(data);
			$state.go('store');
		}).error(function(err){
			console.log(err);
		});
	};

}]);
