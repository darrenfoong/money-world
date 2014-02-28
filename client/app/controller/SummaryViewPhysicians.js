Ext.define('moneyworld.controller.SummaryViewPhysicians', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewPhysicians: 'summaryview_physicians'
		},
		control: {
			'summaryViewPhysicians': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {

		localStorage["direction"] = 1; // higher value means good
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
				this.getSummaryViewPhysicians().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewPhysicians().getDataSet() })
			]);

			if ( dataPointsStore.last() ) {
				var currentPhysicians = dataPointsStore.last().get('value');
				if ( currentPhysicians == "" ) {
					var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
					this.getSummaryViewPhysicians().setHtml(htmlString);
					return;
				}
			} else {
				var htmlString = "<h1 class='summaryview-nodata'>No data available.</h1>";
				this.getSummaryViewPhysicians().setHtml(htmlString);
				return;
			}

			currentPhysicians = parseInt(currentPhysicians * 100);

			var factors = moneyworld.utils.Functions.findApproxFactors(currentPhysicians);
			var width = factors.factor1;
			var height = factors.factor2;

			var viewWidth = this.getSummaryViewPhysicians().element.getWidth();
			var viewHeight = this.getSummaryViewPhysicians().element.getHeight();

			if ( viewWidth > viewHeight ) {
				var temp = width;
				width = height;
				height = temp;
			}

			var htmlString = "";

			htmlString += "<div class='summaryview_physicians-container'>";
			htmlString += "<div class='summaryview_physicians-description'>";

			if ( currentPhysicians == 1 ) {
				htmlString += "<h2 class='summaryview_physicians-small'>There is</h2>";
				htmlString += "<h1 class='summaryview_physicians-big'>" + currentPhysicians + " doctor</h1>";
			} else {
				htmlString += "<h2 class='summaryview_physicians-small'>There are</h2>";
				htmlString += "<h1 class='summaryview_physicians-big'>" + currentPhysicians + " doctors</h1>";
			}

			htmlString += "<h2 class='summaryview_physicians-small'>for every 100000 people</h2>";
			htmlString += "</div>";
			htmlString += "<div class='summaryview_physicians-grid'>";
			for ( var i = 0; i < height; i++ ) {
				htmlString += "<div class='summaryview_physicians-row'>";
				for ( var j = 0; j < width; j++ ) {
					htmlString += "<span class='summaryview_physicians-cell summaryview_physicians-cell-user-md'>";
					if ( currentPhysicians > 0 ) {
						htmlString += "<i class='fa fa-user-md'></i>";
						currentPhysicians--;
					}
					htmlString += "</span>";
				}
				htmlString += "</div>";
			}
			htmlString += "</div>";
			htmlString += "</div>";

			this.getSummaryViewPhysicians().setHtml(htmlString);

			Ext.select('.summaryview_physicians-grid').setWidth(0.9 * viewWidth);
			Ext.select('.summaryview_physicians-grid').setHeight(0.5 * viewHeight);
			var fontSize = Ext.Array.min([Ext.select('.summaryview_physicians-cell').first().getWidth(), Ext.select('.summaryview_physicians-cell').first().getHeight()]) * 0.9;
			Ext.select('.summaryview_physicians-grid').setStyle("font-size", fontSize + 	"px");
			// Visualisation code ends here
		}
	}
});
