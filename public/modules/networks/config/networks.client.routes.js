'use strict';

//Setting up route
angular.module('networks').config(['$stateProvider',
	function($stateProvider) {
		// Networks state routing
		$stateProvider.
		state('listNetworks', {
			url: '/networks',
			templateUrl: 'modules/networks/views/list-networks.client.view.html'
		}).
		state('createNetwork', {
			url: '/networks/create',
			templateUrl: 'modules/networks/views/create-network.client.view.html'
		}).
		state('viewNetwork', {
			url: '/networks/:networkId',
			templateUrl: 'modules/networks/views/view-network.client.view.html'
		}).
		state('editNetwork', {
			url: '/networks/:networkId/edit',
			templateUrl: 'modules/networks/views/edit-network.client.view.html'
		}).
		state('detailNetwork', {
			url: '/networks/:networkId/detail',
			templateUrl: 'modules/networks/views/edit-network.client.view.html'
		});
	}
]);