'use strict';

(function() {
	// Networkdetails Controller Spec
	describe('Networkdetails Controller Tests', function() {
		// Initialize global variables
		var NetworkdetailsController,
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

			// Initialize the Networkdetails controller.
			NetworkdetailsController = $controller('NetworkdetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Networkdetail object fetched from XHR', inject(function(Networkdetails) {
			// Create sample Networkdetail using the Networkdetails service
			var sampleNetworkdetail = new Networkdetails({
				name: 'New Networkdetail'
			});

			// Create a sample Networkdetails array that includes the new Networkdetail
			var sampleNetworkdetails = [sampleNetworkdetail];

			// Set GET response
			$httpBackend.expectGET('networkdetails').respond(sampleNetworkdetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.networkdetails).toEqualData(sampleNetworkdetails);
		}));

		it('$scope.findOne() should create an array with one Networkdetail object fetched from XHR using a networkdetailId URL parameter', inject(function(Networkdetails) {
			// Define a sample Networkdetail object
			var sampleNetworkdetail = new Networkdetails({
				name: 'New Networkdetail'
			});

			// Set the URL parameter
			$stateParams.networkdetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/networkdetails\/([0-9a-fA-F]{24})$/).respond(sampleNetworkdetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.networkdetail).toEqualData(sampleNetworkdetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Networkdetails) {
			// Create a sample Networkdetail object
			var sampleNetworkdetailPostData = new Networkdetails({
				name: 'New Networkdetail'
			});

			// Create a sample Networkdetail response
			var sampleNetworkdetailResponse = new Networkdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Networkdetail'
			});

			// Fixture mock form input values
			scope.name = 'New Networkdetail';

			// Set POST response
			$httpBackend.expectPOST('networkdetails', sampleNetworkdetailPostData).respond(sampleNetworkdetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Networkdetail was created
			expect($location.path()).toBe('/networkdetails/' + sampleNetworkdetailResponse._id);
		}));

		it('$scope.update() should update a valid Networkdetail', inject(function(Networkdetails) {
			// Define a sample Networkdetail put data
			var sampleNetworkdetailPutData = new Networkdetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Networkdetail'
			});

			// Mock Networkdetail in scope
			scope.networkdetail = sampleNetworkdetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/networkdetails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/networkdetails/' + sampleNetworkdetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid networkdetailId and remove the Networkdetail from the scope', inject(function(Networkdetails) {
			// Create new Networkdetail object
			var sampleNetworkdetail = new Networkdetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Networkdetails array and include the Networkdetail
			scope.networkdetails = [sampleNetworkdetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/networkdetails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNetworkdetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.networkdetails.length).toBe(0);
		}));
	});
}());