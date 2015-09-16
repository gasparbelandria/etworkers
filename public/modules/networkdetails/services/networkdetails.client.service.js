'use strict';

//Networkdetails service used to communicate Networkdetails REST endpoints
angular.module('networkdetails').factory('Networkdetails', ['$resource',
	function($resource) {
		return $resource('networkdetails/:networkdetailId', { networkdetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);