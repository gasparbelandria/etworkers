'use strict';

// Networkdetails controller
angular.module('networkdetails').controller('NetworkdetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Networkdetails',
	function($scope, $stateParams, $location, Authentication, Networkdetails ) {
		$scope.authentication = Authentication;

		// Create new Networkdetail
		$scope.create = function() {
			// Create new Networkdetail object
			var networkdetail = new Networkdetails ({
				name: this.name
			});

			// Redirect after save
			networkdetail.$save(function(response) {
				$location.path('networkdetails/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Networkdetail
		$scope.remove = function( networkdetail ) {
			if ( networkdetail ) { networkdetail.$remove();

				for (var i in $scope.networkdetails ) {
					if ($scope.networkdetails [i] === networkdetail ) {
						$scope.networkdetails.splice(i, 1);
					}
				}
			} else {
				$scope.networkdetail.$remove(function() {
					$location.path('networkdetails');
				});
			}
		};

		// Update existing Networkdetail
		$scope.update = function() {
			var networkdetail = $scope.networkdetail ;

			networkdetail.$update(function() {
				$location.path('networkdetails/' + networkdetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Networkdetails
		$scope.find = function() {
			$scope.networkdetails = Networkdetails.query();
		};

		// Find existing Networkdetail
		$scope.findOne = function() {
			$scope.networkdetail = Networkdetails.get({ 
				networkdetailId: $stateParams.networkdetailId
			});
		};
	}
]);