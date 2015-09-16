'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Networkdetail = mongoose.model('Networkdetail'),
	_ = require('lodash');

/**
 * Create a Networkdetail
 */
exports.create = function(req, res) {
	var networkdetail = new Networkdetail(req.body);
	networkdetail.user = req.user;

	networkdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(networkdetail);
		}
	});
};

/**
 * Show the current Networkdetail
 */
exports.read = function(req, res) {
	res.jsonp(req.networkdetail);
};

/**
 * Update a Networkdetail
 */
exports.update = function(req, res) {
	var networkdetail = req.networkdetail ;

	networkdetail = _.extend(networkdetail , req.body);

	networkdetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(networkdetail);
		}
	});
};

/**
 * Delete an Networkdetail
 */
exports.delete = function(req, res) {
	var networkdetail = req.networkdetail ;

	networkdetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(networkdetail);
		}
	});
};

/**
 * List of Networkdetails
 */
exports.list = function(req, res) { Networkdetail.find().sort('-created').populate('user', 'displayName').exec(function(err, networkdetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(networkdetails);
		}
	});
};

/**
 * Networkdetail middleware
 */
exports.networkdetailByID = function(req, res, next, id) { Networkdetail.findById(id).populate('user', 'displayName').exec(function(err, networkdetail) {
		if (err) return next(err);
		if (! networkdetail) return next(new Error('Failed to load Networkdetail ' + id));
		req.networkdetail = networkdetail ;
		next();
	});
};

/**
 * Networkdetail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.networkdetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};