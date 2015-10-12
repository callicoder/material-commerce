'use strict';
angular.module('materialApp')
.factory('storeService', ['$http', function($http){
	var service = {
		createStore: function(store) {
			return $http.post('/stores', store);
		},

		getStoreDetails: function(storeId) {
			
		}
	};

	return service;
}]);