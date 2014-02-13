Ext.define('moneyworld.controller.Overview', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			overView: 'overview'
		},
		control: {
			'overView': {
				activate: 'loadTitle'
			}
		}
	},

	loadTitle: function() {
		var settingsStore = Ext.getStore('Settings');
		var countriesStore = Ext.getStore('Countries');
		var country = settingsStore.getAt(0).get('country');
		var countryName = countriesStore.findRecord('code2', country).get('name');

		var innerItems = this.getMainView().getInnerItems();
		for ( var i = 0; i < innerItems.length; i++ ) {
			if ( innerItems[i] === this.getOverView() ) {
				break;
			}
		}

		this.getOverView().setTitle(countryName);
		this.getMainView().getNavigationBar().backButtonStack[i] = countryName;
		this.getMainView().getNavigationBar().setTitle(countryName);
	},
});
