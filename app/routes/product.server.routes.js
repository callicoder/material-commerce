'use strict';

var passport = require('passport'),
	users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/product.server.controller');


module.exports = function(app) {

	app.route('/products')
		.get(products.getAllProducts)
		.post(products.createProduct);

	app.route('/products/:productId')
		.get(products.getProduct)
		.put(products.updateProduct)
		.delete(products.deleteProduct);

	app.param('productId', products.productById);	
};
