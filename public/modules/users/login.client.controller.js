'use strict';

angular.module('materialApp')
.controller('loginController', ['$scope', 'security', '$state', function($scope, security, $state){
	$scope.user = {};

	$scope.login = function() {		
		security.login($scope.user)
		.success(function(data){
			console.log(data);
			$state.go('home.activate');
			Materialize.toast('Welcome to MtaerialAdmin ', 4000); 
		}).error(function(err){
			console.log(err);
		});
	};
}]);
