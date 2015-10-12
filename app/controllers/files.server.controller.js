'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),	
	File = mongoose.model('File'),
	config = require('../../config/config'),
	queue = require('../../worker'),
	uuid = require('node-uuid'),
	cloudinary = require('cloudinary');   

exports.listFiles = function(req, res) {
	File.find({}, function(err, files){
		if(err) {
			return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
		} else {
			res.json(files);
		}
	});
};

exports.getFile = function(req, res) {

};

exports.uploadFile = function(req, res) {
	if(req.file) {
		var id = uuid.v1();
		queue.publish(config.IMAGE_PROCESSING_QUEUE, {job_id: id, filePath: req.file.path, public_id: id});

		var file = new File({
			public_id: id,
			url: req.file.path
		});
  		file.save(function(err){
  			if(err) {
  				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
  			} else {
				res.json(file);
			}
  		});
	} else {
		res.status(400).send({
			message: 'There was some error while uploading the file'
		});
	}
};

exports.resizeFiles = function(req, res) {
	if(req.file) {
		var id = uuid.v1();	
		queue.publish(config.IMAGE_RESIZE_QUEUE, {job_id: id, filePath: req.file.path, public_id: id});
		res.send({message: 'Processing of images has started. We will notify once it is done.'});
	} else {
		res.status(400).send({
			message: 'There was some error while uploading the files.'
		});
	}
};