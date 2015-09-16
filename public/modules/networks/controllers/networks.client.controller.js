'use strict';

// Networks controller
angular.module('networks').controller('NetworksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Networks',
	function($scope, $stateParams, $location, Authentication, Networks ) {
		$scope.authentication = Authentication;

		// Create new Network
		$scope.create = function() {
			// Create new Network object
			var network = new Networks ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			network.$save(function(response) {
				$location.path('networks/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Network
		$scope.remove = function( network ) {
			if ( network ) { network.$remove();

				for (var i in $scope.networks ) {
					if ($scope.networks [i] === network ) {
						$scope.networks.splice(i, 1);
					}
				}
			} else {
				$scope.network.$remove(function() {
					$location.path('networks');
				});
			}
		};

		// Update existing Network
		$scope.update = function() {
			var network = $scope.network ;

			network.$update(function() {
				$location.path('networks/' + network._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Networks
		$scope.find = function() {
			$scope.networks = Networks.query();
		};

		// Find existing Network
		$scope.findOne = function() {
			$scope.network = Networks.get({ 
				networkId: $stateParams.networkId
			});
		};
	}
]);