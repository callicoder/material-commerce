'use strict';

module.exports = {
	db: {
		uri: 'mongodb://localhost/material-app',
		options: {
			user: '',
			pass: ''
		}
	},
	rabbitUrl:'amqp://localhost',
	IMAGE_PROCESSING_QUEUE: 'jobs.processImage',
	IMAGE_RESIZE_QUEUE: 'jobs.resizeImage',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'Material Admin - Development Environment'
	},
	cloudinaryParameters: {
		cloud_name: 'callicoder',
		api_key: '977414466731322',
		api_secret: 'I Have removed this.'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1392612974398975',
		clientSecret: process.env.FACEBOOK_SECRET || '378e3a32a3309bacf6a4b2328e2c31d8',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
