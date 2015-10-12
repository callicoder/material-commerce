'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	slug: {
		type: String
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	parent: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	image: {
		src: String 
	},
	storeId: {
		type: Schema.ObjectId
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {

	},
});

mongoose.model('Category', CategorySchema);