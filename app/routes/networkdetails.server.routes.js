'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var networkdetails = require('../../app/controllers/networkdetails');

	// Networkdetails Routes
	app.route('/networkdetails')
		.get(networkdetails.list)
		.post(users.requiresLogin, networkdetails.create);

	app.route('/networkdetails/:networkdetailId')
		.get(networkdetails.read)
		.put(users.requiresLogin, networkdetails.hasAuthorization, networkdetails.update)
		.delete(users.requiresLogin, networkdetails.hasAuthorization, networkdetails.delete);

	// Finish by binding the Networkdetail middleware
	app.param('networkdetailId', networkdetails.networkdetailByID);
};