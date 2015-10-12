'use strict';


var passport = require('passport'),
	users = require('../../app/controllers/users.server.controller'),
	files = require('../../app/controllers/files.server.controller'),
	multer = require('multer');

module.exports = function(app) {

	var upload = multer({dest: './uploads/'});

	app.route('/files')
		.get(files.listFiles)
		.post(users.requiresLogin, upload.single('file'), files.uploadFile);	

	app.route('/resizeFiles')
		.post(upload.single('file'), files.resizeFiles);	

	app.route('/files/:fileId')
		.get(files.getFile);	
};
