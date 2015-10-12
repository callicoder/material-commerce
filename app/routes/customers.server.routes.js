'use strict';


var passport = require('passport'),
	users = require('../../app/controllers/users.server.controller'),
	customers = require('../../app/controllers/customers.server.controller');

module.exports = function(app) {
	app.route('/customers')
		.get(customers.listCustomers);	

	app.route('/customers/:customerId')
		.get(customers.getCustomer);	
};
