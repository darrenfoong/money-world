Ext.define('moneyworld.controller.SummaryViewMortality', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewMortality: 'summaryview_mortality'
		},
		control: {
			'summaryViewMortality': {
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
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewMortality().getDataSet() })
			]);
			var currentMortality = dataPointsStore.first().get('value');


		// var htmlString = 'sdaff<div id="wrapper" style="width:100%; height:100%; background:blue;"> <div id="adult_tomb" style="position:relative; width:50%;height:100%; float:left"> <div class="tomb_value" style=" position:absolute;top:0; height:40; width:100%; margin: 0 auto; text-align:center "></div> <div class="tomb_picture" style=" position:absolute; bottom:0; width:100%; margin: 0 auto;"></div> </div> <div id="child_tomb" style="position:relative; width:50%;height:100%;  float:left"> <div class="tomb_value" style=" position:absolute;top:0; height:40; width:100%; margin: 0 auto; text-align:center "></div> <div class="tomb_picture" style=" position:absolute; bottom:0; width:100%; margin: 0 auto;"></div> </div> </div> <!-- templates --> <img id="tomb_img" src="halloween_rounded_tombstone.png" style="display:none; margin: 0 auto;">';

			// this.getSummaryViewMortality().setHtml(htmlString);
			// Visualisation code ends here
		}

	}
});
