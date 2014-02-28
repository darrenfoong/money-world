Ext.define('moneyworld.controller.MapView', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			mapView: 'mapview'
		},
		control: {
			'mapView': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
		console.log("Loading MapView");

		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;

		var settingsRecords = [];
		var dataPointsRecords = [];

		var currentRegionCode;
		settingsStore.load({ callback: loadDataSetsStore, scope: this });

		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			currentCountry = records[0].get('countryCode');
			currentRegion = records[0].get('region');
			console.log(currentRegion);
			if (currentRegion == "Western Africa"){
				currentRegionCode = "wafrica";
			}
			else {
				currentRegionCode = "safrica";
			}
			dataSetsStore.load({ callback: loadDataPointsStore, scope: this });
		}

		function loadDataPointsStore(records, operation, success) {
			var myDataSet = this.getMapView().getDataSet();
			var myDataSetRecord = dataSetsStore.findRecord('id', myDataSet).getData();
			localStorage["dataSetRecords"] = JSON.stringify(myDataSetRecord);
			dataSetsRecords = records;
			dataPointsStore = moneyworld.utils.Functions.getServerStore(
				this.getMapView().getDataSet(),
				"all",
				currentRegionCode);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			// myInj = this.getMapView();
			moneyworld.utils.Functions.changeTitle(this.getMapView(), this.getMainView(), currentRegion);
			console.log("Setting MapView title to " + currentRegion);
			localStorage["moneyworld"] = JSON.stringify(moneyworld.utils.Functions.storeToJson(records));
			console.log("Setting local storage");
			// Visualisation code ends here
		}
	}
});
