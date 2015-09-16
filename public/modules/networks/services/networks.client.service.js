'use strict';

//Networks service used to communicate Networks REST endpoints
angular.module('networks').factory('Networks', ['$resource',
	function($resource) {
		return $resource('networks/:networkId', { networkId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);