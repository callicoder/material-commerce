'use strict';

angular.module('materialApp')
.factory('productService', ['$http', function($http){
	
	var service = {
		getAllProducts: function() {
			return $http.get('/products');
		},

		createProduct: function(product) {
			return $http.post('/products', product);
		},

		getProduct: function(productId) {
			return $http.get('/product/' + productId);
		},

		updateProduct: function(product) {
			return $http.put('/product/' + product.productId, product);
		},

		deleteProduct: function(productId) {
			return $http.delete('/product/' + productId);
		}
	};

	return service;
}]);
