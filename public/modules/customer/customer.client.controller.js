'use strict';

angular.module('materialApp')
.controller('customerController', ['$scope', 'customerService', function($scope, customerService){
	customerService.listCustomers()
	.then(function(response) {
		$scope.customers = response.data;
	});
}]);

