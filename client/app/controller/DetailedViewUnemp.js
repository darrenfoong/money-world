Ext.define('moneyworld.controller.DetailedViewUnemp', {
	extend: 'moneyworld.controller.DetailedView',
	
	config: {
		refs: {
			mainView: 'main',
			detailedViewUnemp: 'detailedview_unemp',
			detailedViewUnempChart: 'detailedview_unemp chart'
		},
		control: {
			'detailedViewUnemp': {
				initialize: 'renderView'
			}
		}
	},


	renderView: function() {
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
				this.getDetailedViewUnemp().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			this.getDetailedViewUnempChart().setStore(dataPointsStore);

			var yaxis = Ext.create('Ext.chart.axis.Axis', {
					type: 'numeric',
					position: 'left',
					grid: true,
					minimum: Number(dataPointsStore.min('value')),
					maximum: Number(dataPointsStore.max('value'))
			});

			var xaxis = Ext.create('Ext.chart.axis.Axis', {
					type: 'time',
					position: 'bottom',
					title: 'Year',
					grid: true,
					minimum: Number(dataPointsStore.min('year')),
					maximum: Number(dataPointsStore.max('year')),
					renderer: function(v) { return v.toFixed(0); }
			});

			this.getDetailedViewUnempChart().setAxes([yaxis, xaxis]);
			// Visualisation code ends here
		}
	}
});
