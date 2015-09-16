'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var networks = require('../../app/controllers/networks');

	// Networks Routes
	app.route('/networks')
		.get(networks.list)
		.post(users.requiresLogin, networks.create);

	app.route('/networks/:networkId')
		.get(networks.read)
		.put(users.requiresLogin, networks.hasAuthorization, networks.update)
		.delete(users.requiresLogin, networks.hasAuthorization, networks.delete);

	// Finish by binding the Network middleware
	app.param('networkId', networks.networkByID);
};