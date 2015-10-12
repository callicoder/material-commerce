  'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Product = mongoose.model('Product');

exports.getAllProducts = function(req, res) {
	Product.find({storeId: req.user.store}, function(err, products){
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
		} else {
			res.json(products);
		}
	});
};

exports.createProduct = function(req, res) {
	var product = new Product(req.body);
	product.storeId = req.user.store;
	product.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

exports.getProduct = function(req, res) {
	res.json(req.product);
};

exports.updateProduct = function(req, res) {
	var product = req.product;
	product = _.extend(product, req.body);

	product.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

exports.deleteProduct = function(req, res) {
	var product = req.product;
	product.remove(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});	
};

exports.productById = function(req, res, next, id) {
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Product is invalid'
		});
	}

	Product.findById(id).exec(function(err, product){
		if(err) {
			return next(err);
		}

		if(!product) {
			return res.status(404).send({
				message: 'Category not found'
			});
		}

		req.product = product;
		next();
	});
};