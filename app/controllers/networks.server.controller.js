'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Network = mongoose.model('Network'),
	_ = require('lodash');

/**
 * Create a Network
 */
exports.create = function(req, res) {
	var network = new Network(req.body);
	network.user = req.user;

	network.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(network);
		}
	});
};

/**
 * Show the current Network
 */
exports.read = function(req, res) {
	res.jsonp(req.network);
};

/**
 * Update a Network
 */
exports.update = function(req, res) {
	var network = req.network ;

	network = _.extend(network , req.body);

	network.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(network);
		}
	});
};

/**
 * Delete an Network
 */
exports.delete = function(req, res) {
	var network = req.network ;

	network.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(network);
		}
	});
};

/**
 * List of Networks
 */
exports.list = function(req, res) { Network.find().sort('-created').populate('user', 'displayName').exec(function(err, networks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(networks);
		}
	});
};

/**
 * Network middleware
 */
exports.networkByID = function(req, res, next, id) { Network.findById(id).populate('user', 'displayName').exec(function(err, network) {
		if (err) return next(err);
		if (! network) return next(new Error('Failed to load Network ' + id));
		req.network = network ;
		next();
	});
};

/**
 * Network authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.network.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};