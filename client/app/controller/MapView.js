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
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;

		var settingsRecords = [];
		var dataPointsRecords = [];

		settingsStore.load({ callback: loadDataSetsStore, scope: this });

		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			currentCountry = records[0].get('countryCode');
			currentRegion = records[0].get('region');
			dataSetsStore.load({ callback: loadDataPointsStore, scope: this });
		}

		function loadDataPointsStore(records, operation, success) {
			dataSetsRecords = records;
			dataPointsStore = moneyworld.utils.Functions.getServerStore(
				this.getMapView().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			this.getMapView().setTitle(currentRegion);
			console.log("Setting MapView title to " + currentRegion);
			localStorage["moneyworld"] = dataPointsStore;
			console.log("Setting local storage");
			// Visualisation code ends here
		}
	}
});
