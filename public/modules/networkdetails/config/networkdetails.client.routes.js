'use strict';

//Setting up route
angular.module('networkdetails').config(['$stateProvider',
	function($stateProvider) {
		// Networkdetails state routing
		$stateProvider.
		state('listNetworkdetails', {
			url: '/networkdetails',
			templateUrl: 'modules/networkdetails/views/list-networkdetails.client.view.html'
		}).
		state('createNetworkdetail', {
			url: '/networkdetails/create',
			templateUrl: 'modules/networkdetails/views/create-networkdetail.client.view.html'
		}).
		state('viewNetworkdetail', {
			url: '/networkdetails/:networkdetailId',
			templateUrl: 'modules/networkdetails/views/view-networkdetail.client.view.html'
		}).
		state('editNetworkdetail', {
			url: '/networkdetails/:networkdetailId/edit',
			templateUrl: 'modules/networkdetails/views/edit-networkdetail.client.view.html'
		});
	}
]);