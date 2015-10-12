'use strict';

var passport = require('passport'),
	users = require('../../app/controllers/users.server.controller'),
	stores = require('../../app/controllers/store.server.controller');

module.exports = function(app) {
	
	// Store Routes
	app.route('/stores')
		.post(users.requiresLogin, stores.createStore);

	app.route('/stores/:storeId')
		.get(stores.getStoreDetails);

	app.param('storeId', stores.storeById);		
};