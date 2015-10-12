'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VariantSchema = new Schema({
	position: {
		type: Number
	},
	sku: {
		type: String
	},
	requiresShipping: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

var ProductSchema = new Schema({
	productCode: {
		type: String
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title can not be blank'
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	storeId: {
		type: Schema.ObjectId
	},
	productType: {
		type: String
	},
	vendor: {
		type: String
	},
	variants: [VariantSchema],
	published: {
		type: Boolean
	},
	publishedAt: {
		type: Date
	}, 
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

mongoose.model('Product', ProductSchema);
