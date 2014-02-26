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

	preHtmlString : 'Inflation is currently at',
	postHtmlString : 'in ',

	renderView: function() {
		
		localStorage["direction"] = 1; // higher value means worse
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;
		
		var preHtmlString = this.preHtmlString;
		var postHtmlString = this.postHtmlString;

		var settingsRecords = [];
		var dataPointsRecords = [];

		settingsStore.load({ callback: loadDataSetsStore, scope: this });

		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			currentCountry = records[0].get('countryCode');
			postHtmlString += records[0].get('countryName');
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
			var dataSetID = this.getSummaryViewInflation().getDataSet();
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: dataSetID })
			]);
			var currentInflation = dataPointsStore.last().get('value'); 
			var dataStoreRecord = dataSetsStore.findRecord('id', dataSetID);
			
			var currentInflationFormatted = moneyworld.utils.Functions.prettify(currentInflation,dataStoreRecord.get('precision'),dataStoreRecord.get('prefix'),dataStoreRecord.get('suffix'));

			if ( currentInflation == "" ) {
				var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
				this.getSummaryViewInflation().setHtml(htmlString);
				return;
			}
			
			var colourString = '#79BB3F'; //NEED TO GET COLOUR FUNCTION
			
			var htmlString = '';
			htmlString += "<div class='summaryview_inflation-container'>";
			htmlString += "<div class='summaryview_inflation-description'>";
			htmlString += preHtmlString;
			htmlString += "<div class='summaryview_inflation-big'><font color = '" + colourString + "'>" + currentInflationFormatted + "</font></div>";
			htmlString += postHtmlString;
			
			htmlString += "</div>";
			htmlString += "</div>";
			
			this.getSummaryViewInflation().setHtml(htmlString);
			// Visualisation code ends here
		}
	}
});
