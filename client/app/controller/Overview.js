Ext.define('moneyworld.controller.Overview', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			overView: 'overview'
		},
		control: {
			'overView': {
				show: 'loadTitle'
			}
		}
	},

	loadTitle: function() {
		console.log("Loading Overview");
		var settingsStore = Ext.getStore('Settings');
		settingsStore.load({ callback: setTitle, scope: this });

		function setTitle(records, operation, success) {
			var countryName = records[0].get('countryName');

			var innerItems = this.getMainView().getInnerItems();
			for ( var i = 0; i < innerItems.length; i++ ) {
				if ( innerItems[i] === this.getOverView() ) {
					break;
				}
			}

			this.getOverView().setTitle(countryName);
			this.getMainView().getNavigationBar().backButtonStack[i] = countryName;
			this.getMainView().getNavigationBar().setTitle(countryName);
			console.log("Setting title to " + countryName);
		}
	},
});
