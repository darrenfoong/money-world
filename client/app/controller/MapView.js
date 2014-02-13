Ext.define('moneyworld.controller.MapView', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			mapView: 'mapview'
		},
		control: {
			'mapView': {
				activate: 'loadTitle'
			}
		}
	},

	loadTitle: function() {
		var settingsStore = Ext.getStore('Settings');
		var countriesStore = Ext.getStore('Countries');
		var country = settingsStore.getAt(0).get('country');
		var regionName = countriesStore.findRecord('code2', country).get('region');

		this.getMapView().setTitle(regionName);
	},
});
