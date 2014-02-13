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
		console.log("Loading MapView");
		var settingsStore = Ext.getStore('Settings');
		settingsStore.load({ callback: setTitle, scope: this });

		function setTitle(records, operation, success) {
			var regionName = records[0].get('region');
			this.getMapView().setTitle(regionName);
			console.log("Setting title to " + regionName);
		}
	},
});
