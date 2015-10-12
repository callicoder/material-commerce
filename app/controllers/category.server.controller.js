'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Category = mongoose.model('Category'),
	fs = require('fs');

exports.listTopLevelCategories = function(req, res) {
	Category.find({parent: {$eq: null}, storeId: req.user.store}, function(err, categories) {
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
		} else {
			res.json(categories);
		}
	});	
};

exports.createCategory = function(req, res) {
	console.log(res.user);	
	var category = new Category(req.body);
	if(!req.body.parent) {
		category.parent = null;
	}
	category.storeId = req.user.store;
	category.image.src = req.file.path;

	category.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(category);
		}
	});
};

exports.getCategoryHierarchy = function(req, res) {

};

exports.countTopLevelCategories = function(req, res) {
	Category.count({parent: {$eq: null}, storeId: req.user.store}, function(err, count){
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });			
		} else {
			res.json(count);
		}
	});
};

exports.getCategory = function(req, res) {
	res.json(req.category);
};

exports.updateCategory = function(req, res) {
	var category = req.category;
	category = _.extend(category, req.body);
	
	fs.unlink(category.image.src, function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		if(!req.body.parent) {
			category.parent = null;
		}
		category.storeId = req.user.store;
		category.image.src = req.file.path;

		category.save(function(err){
			if(err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(category);
			}
		});
	});
};

exports.deleteCategory = function(req, res) {
	var category = req.category;
	category.remove(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			fs.unlink(category.image.src, function(err){
				if(err) {
					return res.status(500).send({
						message: errorHandler.getErrorMessage(err)
					});	
				}
				res.json(category);
			});	
		}
	});
};

exports.categoryById = function(req, res, next, id) {
	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Category is invalid'
		});
	}

	Category.findById(id).exec(function(err, category){
		if(err) {
			return next(err);
		}

		if(!category) {
			return res.status(404).send({
				message: 'Category not found'
			});
		}

		req.category = category;
		next();
	});
};

exports.getSubcategories = function(req, res) {
	Category.find({parent: req.params.parentCategoryId, storeId: req.user.store}, function(err, categories){
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
		} else {
			res.json(categories);
		}
	});
};

exports.countSubcategories = function(req, res) {
	Category.count({parent: req.params.parentCategoryId, storeId: req.user.store}, function(err, count){
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });			
		} else {
			res.json(count);
		}
	});
};
