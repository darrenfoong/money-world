Ext.define('moneyworld.controller.MapView', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			mapView: 'mapview'
		},
		control: {
			'mapView': {
				initialize: 'renderView',
				drawMap: 'drawMap'
			}
		}
	},
	sample2: null,
	currentCountry: null,
	direction: 0, //default green for high
	dataSetRecord:null, //to pass to map so it formats things properly
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
		settingsStore.load({
			callback: loadDataSetsStore,
			scope: this
		});


		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			this.currentCountry = records[0].get('countryCode');
			// currentRegion = records[0].get('region');
			// console.log(currentRegion);
			// if (currentRegion == "Western Africa"){
			// 	currentRegionCode = "wafrica";
			// }
			// else {
			// 	currentRegionCode = "safrica";
			// }
			dataSetsStore.load({
				callback: loadDataPointsStore,
				scope: this
			});
		}

		function loadDataPointsStore(records, operation, success) {
			var myDataSet = this.getMapView().getDataSet();
			var myDataSetRecord = dataSetsStore.findRecord('id', myDataSet).getData();
			this.dataSetRecord = myDataSetRecord;
			dataSetsRecords = records;
			dataPointsStore = moneyworld.utils.Functions.getServerStore(
				myDataSet,
				"all",
				"all");
			// currentRegionCode);
			dataPointsStore.load({
				callback: setData,
				scope: this
			});
		}

		function setData(records, operation, success) {
			this.sample2 = moneyworld.utils.Functions.storeToJson(records);
			var map = generateMap('africa_en', this.sample2['2010'], this.dataSetRecord, 1);
			map.setFocus(this.currentCountry);
		}
	},
	drawMap: function(a) {

		this.direction = this.getMapView().getDirection();
		var map = generateMap('africa_en', this.sample2[a], this.dataSetRecord, this.direction);
		// map.setFocus(this.currentCountry);
	}
});