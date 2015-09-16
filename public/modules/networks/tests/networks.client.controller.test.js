'use strict';

(function() {
	// Networks Controller Spec
	describe('Networks Controller Tests', function() {
		// Initialize global variables
		var NetworksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Networks controller.
			NetworksController = $controller('NetworksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Network object fetched from XHR', inject(function(Networks) {
			// Create sample Network using the Networks service
			var sampleNetwork = new Networks({
				name: 'New Network'
			});

			// Create a sample Networks array that includes the new Network
			var sampleNetworks = [sampleNetwork];

			// Set GET response
			$httpBackend.expectGET('networks').respond(sampleNetworks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.networks).toEqualData(sampleNetworks);
		}));

		it('$scope.findOne() should create an array with one Network object fetched from XHR using a networkId URL parameter', inject(function(Networks) {
			// Define a sample Network object
			var sampleNetwork = new Networks({
				name: 'New Network'
			});

			// Set the URL parameter
			$stateParams.networkId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/networks\/([0-9a-fA-F]{24})$/).respond(sampleNetwork);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.network).toEqualData(sampleNetwork);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Networks) {
			// Create a sample Network object
			var sampleNetworkPostData = new Networks({
				name: 'New Network'
			});

			// Create a sample Network response
			var sampleNetworkResponse = new Networks({
				_id: '525cf20451979dea2c000001',
				name: 'New Network'
			});

			// Fixture mock form input values
			scope.name = 'New Network';

			// Set POST response
			$httpBackend.expectPOST('networks', sampleNetworkPostData).respond(sampleNetworkResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Network was created
			expect($location.path()).toBe('/networks/' + sampleNetworkResponse._id);
		}));

		it('$scope.update() should update a valid Network', inject(function(Networks) {
			// Define a sample Network put data
			var sampleNetworkPutData = new Networks({
				_id: '525cf20451979dea2c000001',
				name: 'New Network'
			});

			// Mock Network in scope
			scope.network = sampleNetworkPutData;

			// Set PUT response
			$httpBackend.expectPUT(/networks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/networks/' + sampleNetworkPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid networkId and remove the Network from the scope', inject(function(Networks) {
			// Create new Network object
			var sampleNetwork = new Networks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Networks array and include the Network
			scope.networks = [sampleNetwork];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/networks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNetwork);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.networks.length).toBe(0);
		}));
	});
}());