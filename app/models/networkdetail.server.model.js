'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Networkdetail Schema
 */
var NetworkdetailSchema = new Schema({
	network_id: {
		type: Number,
		default: ''
	},
	user_id: {
		type: Number,
		default: ''
	},
	parent_id: {
		type: Number,
		default: ''
	},
	approved: {
		type: Number,
		default: 0
	},
	approvedDate: {
		type: Date,
		default: null
	},
	created: {
		type: Date,
		default: Date.now
	},
	network: {
		type: Schema.ObjectId,
		ref: 'Network'
	}
});

mongoose.model('Networkdetail', NetworkdetailSchema);