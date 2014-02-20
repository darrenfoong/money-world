Ext.define('moneyworld.controller.SummaryViewInflation', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewInflation: 'summaryview_inflation'
		},
		control: {
			'summaryViewInflation': {
				initialize: 'renderView'
			}
		}
	},

	preHtmlString : '',
	postHtmlString : '',

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
				this.getSummaryViewInflation().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewInflation().getDataSet() })
			]);
			var currentInflation = '3%' // dataPointsStore.last().get('value');

			if (false) {//if ( currentInflation == "" ) {
				var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
				this.getSummaryViewInflation().setHtml(htmlString);
				return;
			}
			
			var htmlString = '';
			htmlString += "<div class='summaryview_unemp-container'>";
			htmlString += "<div class='summaryview_unemp-description'>";
			htmlString += this.preHtmlString;
			htmlString += "<h1 class='summaryview-nodata'>" + currentInflation + "</h1>";
			htmlString += this.postHtmlString;
			
			htmlString += "</div>";
			htmlString += "</div>";
			console.log(htmlString);
			
			this.getSummaryViewInflation().setHtml(htmlString);
			// Visualisation code ends here
		}
	}
});
