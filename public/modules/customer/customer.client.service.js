'use strict';

angular.module('materialApp')
.factory('customerService', ['$http', function($http){
	var service = {
		listCustomers: function() {
			return $http.get('/customers');
		},

		getCustomer: function(customerId) {
			return $http.get('/customers/' + customerId);
		}
	};

	return service;
}]);
