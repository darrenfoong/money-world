Ext.define('moneyworld.controller.SummaryViewGini', {
	extend: 'moneyworld.controller.SummaryView',
	
	config: {
		refs: {
			mainView: 'main',
			summaryViewGini: 'summaryview_gini'
		},
		control: {
			'summaryViewGini': {
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
				this.getSummaryViewGini().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
			var dataSetID = this.getSummaryViewGini().getDataSet();
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: dataSetID })
			]);
			var currentGini = dataPointsStore.last().get('value'); 
						
			if ( currentGini == "" ) {
				var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
				this.getSummaryViewGini().setHtml(htmlString);
				return;
			}
			
			var top20 = 20;
			var low20 = 20;
			var topHeight = 10;
			var lowHeight = 30;
			var midHeight = 100 - topHeight - lowHeight;
						
			var htmlString = '';
			htmlString += "<table class='summaryview_gini-table' border=1>";
			htmlString += "<tr class='summaryview_gini-top' height=" + topHeight +"%><td>The top 10% hold " + topHeight + "% of the wealth</td></tr>";
			htmlString += "<tr class='summaryview_gini-mid' height=" + midHeight +"%><td>" + midHeight + "%</td></tr>";
			htmlString += "<tr class='summaryview_gini-low' height=" + lowHeight +"%><td>The bottom 10% hold " + lowHeight + "% of the wealth</td></tr>";
			htmlString += "</table>";
			this.getSummaryViewGini().setHtml(htmlString);
						
			
			// Visualisation code ends here
		}
		
	}
});
