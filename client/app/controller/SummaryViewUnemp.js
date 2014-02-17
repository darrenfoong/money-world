Ext.define('moneyworld.controller.SummaryViewUnemp', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewUnemp: 'summaryview_unemp'
		},
		control: {
			'summaryViewUnemp': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore = Ext.create('Ext.data.Store', {
			model: 'moneyworld.model.DataPoint',
			proxy: {
				type: 'ajax',
				url: 'data/datapoints.json',
				reader: {
					type: 'json',
					rootProperty: 'datapoints'
				}
			}
		});

		dataSetsRecords = [];
		dataPointsRecords = [];
		dataSetsStore.load({ callback: loadDataPointsStore, scope: this });

		function loadDataPointsStore(records, operation, success) {
			dataSetsRecords = records;
			dataPointsStore.load({ callback: loadSettings, scope: this });
		}

		function loadSettings(records, operation, success) {
			dataPointsRecords = records;
			settingsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			var currentCountry = records[0].get('countryCode');
			var currentRegion = records[0].get('region');
			// Visualisation code starts here
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewUnemp().getDataSet() })
			]);
			var currentUnemp = dataPointsStore.first().get('value');
			this.getSummaryViewUnemp().setHtml(currentUnemp);
			// Visualisation code ends here
		}
	}
});
