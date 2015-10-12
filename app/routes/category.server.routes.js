'use strict';

var passport = require('passport'),
	users = require('../../app/controllers/users.server.controller'),
	categories = require('../../app/controllers/category.server.controller'),
	multer = require('multer');

module.exports = function(app) {
	
	// configure multer for file upload
	var upload = multer({dest: './uploads/'});

	// Category Routes
	app.route('/categories')
		.get(categories.listTopLevelCategories)
		.post(users.requiresLogin, upload.single('file'), categories.createCategory);
	
	app.route('/categories/hierarchy')
		.get(categories.getCategoryHierarchy);

	app.route('/categories/count')
		.get(categories.countTopLevelCategories);

    app.param('categoryId', categories.categoryById);

	app.route('/categories/:categoryId')
		.get(categories.getCategory)
		.put(users.requiresLogin, categories.updateCategory)
		.delete(users.requiresLogin, categories.deleteCategory);

	app.route('/subcategories/:parentCategoryId')
		.get(categories.getSubcategories);

	app.route('/subcategories/count/:parentCategoryId')
		.get(categories.countSubcategories);

};