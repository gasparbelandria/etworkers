'use strict';

// Configuring the Articles module
angular.module('networks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Networks', 'networks', 'dropdown', '/networks(/create)?');
		Menus.addSubMenuItem('topbar', 'networks', 'List Networks', 'networks');
		Menus.addSubMenuItem('topbar', 'networks', 'New Network', 'networks/create');
	}
]);