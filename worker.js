var jackrabbit = require('jackrabbit'),
	config = require('./config/config'),
	cloudinary = require('cloudinary'),
	mongoose = require('mongoose'),
	File = mongoose.model('File'),
	gm = require('gm'),
	async = require('async');

var queue = jackrabbit(config.rabbitUrl);

queue.on('connected', function(){
   	console.log('connected to rabbitmq');
    queue.create(config.IMAGE_PROCESSING_QUEUE, {prefetch: 5}, onReady);
    queue.create(config.IMAGE_RESIZE_QUEUE, {prefetch: 5}, onReadyResize);

	function onReady() {
		queue.handle(config.IMAGE_PROCESSING_QUEUE, handleImageProcessingJob);
	};

	function handleImageProcessingJob(job, ack) {
		console.log('Got a job');
		console.log(job);
			
		cloudinary.uploader.upload(job.filePath, function(result) { 
			console.log(result);
			File.findOneAndUpdate({public_id: job.public_id}, result, function(err, file){
				if(err) {
					console.log('error while saving image: ' + err);
				} else {	
					ack();
				}
			})
		});
	};

	function onReadyResize() {
		queue.handle(config.IMAGE_RESIZE_QUEUE, handleImageResizingJob);
	}


	function handleImageResizingJob(job, ack) {
		console.log('Got a job');
		console.log(job);

		async.parallel([
			function(callback) {
				var writeStreamHorizontal = cloudinary.uploader.upload_stream(function(result) { 
					var file = new File(result); 
					file.save(function(err){
						if(err) {
							callback(err);
						}
						console.log('Created Horizontal Image');
						callback();
					});
				});			

				gm(job.filePath)
				.resize(755, 450, '!')
				.stream()
				.pipe(writeStreamHorizontal);
			},
			function(callback) {

				writeStreamVertical = cloudinary.uploader.upload_stream(function(result) { 
					var file = new File(result); 
					file.save(function(err){
						if(err) {
							return callback(err);
						}
						console.log('Created Vertical Image');
						callback();
					});
				});			

				gm(job.filePath)
				.resize(365, 450, '!')
				.stream()
				.pipe(writeStreamVertical);			

			},
			function(callback) {

				writeStreamHorizontalSmall = cloudinary.uploader.upload_stream(function(result) { 
					var file = new File(result); 
					file.save(function(err){
						if(err) {
							return callback(err);
						}
						console.log('Created Horizontal Small Image.');
						callback();
					});
				});

				gm(job.filePath)
				.resize(365, 212, '!')
				.stream()
				.pipe(writeStreamHorizontalSmall);

			},
			function(callback) {
				writeStreamGallery = cloudinary.uploader.upload_stream(function(result) { 
					var file = new File(result); 
					file.save(function(err){
						if(err) {
							return callback(err);		
						}
						console.log('Created Gallery Image');
						callback();
					});
				});			

				gm(job.filePath)
				.resize(380, 380, '!')
				.stream()
				.pipe(writeStreamGallery);

			}
		], function(err) {
			if(err) {
				console.log(err);
			}
			ack();
		});
	}
})
.on('error', function(err){
    console.log('rabbitmq connection error: ' + err);
})
.on('disconnected', function(){
    console.log('disconnected with rabbitmq');
});

exports = module.exports = queue;