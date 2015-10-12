'use strict';

angular.module('materialApp')
.factory('filesService', ['$http', 'Upload', function($http, Upload){
	var service = {
		listFiles: function() {
			return $http.get('/files');
		},

		getFile: function(fileId) {
			return $http.get('/files/' + fileId);
		},

		uploadFile: function(file) {
			console.log(file);
			return Upload.upload({
            	url: '/files',
            	file: file
        	});
		},

		resizeFiles: function(file) {
			console.log(file);
			return Upload.upload({
				url: '/resizeFiles',
				file: file
			});
		}
	};

	return service;
}]);
