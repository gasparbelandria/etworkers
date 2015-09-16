'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Network Schema
 */
var NetworkSchema = new Schema({
	user_id: {
		type: Number,
		default: ''
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Network name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Network description',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Network', NetworkSchema);