'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Store = mongoose.model('Store'),
	User = mongoose.model('User'),
	async = require('async');

exports.createStore = function(req, res) {
	var store = new Store(req.body);
	async.waterfall([
		function(callback) {
			store.save(function(err){
				if(err) {
					return callback(err);
				}
				callback(null, store);
			});
		},
		function(store, callback) {
			User.update({_id: req.user._id}, {store: store._id}, function(err, user) {
				if(err) {
					return callback(err);
				}
				callback(null, store);
			});
		}
	], function(err, result) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.send(result);
	});
};

exports.getStoreDetails = function(req, res) {
	res.json(req.store);
};

exports.storeById = function(req, res, next, id) {
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Category is invalid'
		});
	}

	Store.findById(id).exec(function(err, store){
		if(err) {
			return next(err);
		}

		if(!store) {
			return res.status(404).send({
				message: 'Category not found'
			});
		}

		req.store = store;	
		next();
	});
};
