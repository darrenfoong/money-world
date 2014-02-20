Ext.define('moneyworld.controller.SummaryViewGDP', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewGDP: 'summaryview_gdp'
		},
		control: {
			'summaryViewGDP': {
				initialize: 'renderView'
			}
		}
	},
	
	renderView: function() {
		console.log("initializing SummaryViewGDP");
		
		/*
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
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewGDP().getDataSet() })
			]);
			var currentGDP = dataPointsStore.last().get('value');
		*/
		
		var centrex = 100, centrey = 100, circler = 50;
		this.getSummaryViewGDP().add({
			xtype: 'panel',
			layout: 'card',
			height: '90%',
			width: '100%',
			style: {
				background: 'red'
			},
			initialize: function() {
				var drawComponent1 = Ext.create('Ext.draw.Component', {});
				drawComponent1.getSurface('main').add({
					type: 'circle',
					fill: '#79BB3F',
					radius: circler,
					x: this.width/2,
					y: centrey
				});
				this.add(drawComponent1);
			}
		});
		
		this.getSummaryViewGDP().add({
			xtype: 'panel',
			layout: 'card',
			height: '10%',
			width: '100%',
			style: 'text-align: center',
			html: "<div>GDP is n</div>"
		});
		
	}
});
