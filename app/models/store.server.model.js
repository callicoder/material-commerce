'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AddressSchema = new Schema({
	address1: {
		type: String
	},
	address2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	postal: {
		type: Number
	},
	country: {
		type: String
	},
	phone: {
		type: String
	}
});

var StoreSchema = new Schema({
	name: {
		type: String
	},
	description: {
		type: String
	},
	timezone: {
		type: String
	},
	currency: {
		type: String
	},
	addressBook: [AddressSchema],
	email: {
		type: String,
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});


mongoose.model('Store', StoreSchema);
