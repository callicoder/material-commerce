'use strict';
angular.module('materialApp')
.controller('storeController', ['$scope', '$state', 'storeService', function($scope, $state, storeService){
	$scope.store = {};
	$scope.createStore = function() {
		storeService.createStore($scope.store)
		.then(function(response){
			console.log(response);
			$state.go('home.activate');
		}, function(error){
			console.log(error);
		});
	};
}]);