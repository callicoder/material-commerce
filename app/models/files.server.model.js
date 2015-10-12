'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
	public_id: {
		type: String
	},
	original_filename: {
		type: String
	},
	url: {
		type: String
	},
	secure_url: {
		type: String
	},
	width: {
		type: Number
	},
	height: {
		type: Number
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('File', FileSchema);