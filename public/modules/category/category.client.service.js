'use strict';

angular.module('materialApp')
.factory('categoryService', ['$http', 'Upload', function($http, Upload){
	var service = {
		getTopLevelCategories: function() {
			return $http.get('/categories');
		},

		createCategory: function(category, file) {
			return Upload.upload({
                    url: '/categories',
                    fields: {
                    	'parent': category.parent,	
                        'name': category.name,
                        'description': category.description
                    },
                    file: file
            });
		},

		getCategoryHierarchy: function() {
			return $http.get('/categories/hierarchy');
		},

		countTopLevelCategories: function() {
			return $http.get('/categories/count');
		},

		getCategory: function(categoryId) {
			return $http.get('/categories/' + categoryId);
		},

		updateCategory: function(category) {
			return $http.put('/categories/' + category.categoryId, category);
		},

		deleteCategory: function(categoryId) {
			return $http.delete('/categories/' + categoryId);
		},

		getSubcategories: function(parentCategoryId) {
			return $http.get('/subcategories/' + parentCategoryId);
		},

		countSubcategories: function(parentCategoryId) {
			return $http.get('/subcategories/count/' + parentCategoryId);
		}
	};
	return service;
}]);