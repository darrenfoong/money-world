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
				this.getSummaryViewUnemp().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewUnemp().getDataSet() })
			]);
			var currentUnemp = dataPointsStore.last().get('value');
			console.log(currentUnemp);

			if ( currentUnemp == "" ) {
				var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
				this.getSummaryViewUnemp().setHtml(htmlString);
				return;
			}

			var gridParameters = moneyworld.utils.Functions.floatToGrid(currentUnemp/100);
			var numerator = gridParameters.numerator;
			var denominator = gridParameters.denominator;
			var width = gridParameters.width;
			var height = gridParameters.height;

			var htmlString = "";

			htmlString += "<div class='summaryview_unemp-container'>";
			htmlString += "<div class='summaryview_unemp-description'>";
			htmlString += "<h1 class='summaryview_unemp-big'>" + numerator + " out of " + denominator + "</h1>";
			htmlString += "<h2 class='summaryview_unemp-small'>people are unemployed</h2>";
			htmlString += "</div>";
			htmlString += "<div class='summaryview_unemp-grid'>";
			for ( var i = 0; i < height; i++ ) {
				htmlString += "<div class='summaryview_unemp-row'>";
				for ( var j = 0; j < width; j++ ) {
					htmlString += "<span class='summaryview_unemp-cell'>";
					if ( numerator > 0 ) {
						htmlString += "X";
						numerator--;
					} else {
						htmlString += "O";
					}
					htmlString += "</span>";
				}
				htmlString += "</div>";
			}
			htmlString += "</div>";
			htmlString += "</div>";

			this.getSummaryViewUnemp().setHtml(htmlString);
			// Visualisation code ends here
		}
	}
});
