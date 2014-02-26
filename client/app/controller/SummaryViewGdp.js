Ext.define('moneyworld.controller.SummaryViewGdp', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewGdp: 'summaryview_gdp'
		},
		control: {
			'summaryViewGdp': {
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

		var maxGDP = 0;
		var currentGDP;

		settingsStore.load({
			callback: loadDataSetsStore,
			scope: this
		});

		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			currentCountry = records[0].get('countryCode');
			currentRegion = records[0].get('region');
			dataSetsStore.load({
				callback: loadDataPointsStore,
				scope: this
			});
		}

		function loadDataPointsStore(records, operation, success) {
			dataSetsRecords = records;
			dataPointsStore = moneyworld.utils.Functions.getServerStore(
				this.getSummaryViewGdp().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({
				callback: setData,
				scope: this
			});
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{
				property: 'year',
				direction: 'ASC'
			}]);
			var dataSetID = this.getSummaryViewGdp().getDataSet();
			dataPointsStore.filter([Ext.create('Ext.util.Filter', {
				filterFn: function(dataPoint) {
					var currentValue = parseInt(dataPoint.get('value'));
					if (currentValue > maxGDP) maxGDP = currentValue;
					return true;
				}
			})]);
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', {
					property: 'countryCode',
					value: currentCountry
				}),
				Ext.create('Ext.util.Filter', {
					property: 'dataSetCode',
					value: this.getSummaryViewGdp().getDataSet()
				})
			]);
			currentGDP = dataPointsStore.last().get('value');

			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

			var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

			height = height * 0.9;

			var centrex = width / 2,
				centrey = (height - 46 - 28) / 2,
				circler = ((centrex < centrey) ? centrex : centrey) * (currentGDP / maxGDP) * 0.9;
							
			var colourString = '#79BB3F';

			var circlePanel = Ext.create('Ext.draw.Component', {
				xtype: 'panel',
				layout: 'card',
				height: '90%',
				width: '100%',
				initialize: function() {
				}
			});

			var drawComponent1 = Ext.create('Ext.draw.Component', {});
			drawComponent1.getSurface('main').add({
				type: 'circle',
				fill: colourString,
				radius: circler,
				x: centrex,
				y: centrey
			}, {
				type: 'text',
				text: "$" + parseFloat(currentGDP).toFixed(2),
				x: centrex,
				y: centrey+20,
				fillStyle: '#FFFFFF',
				fontSize: 60,
				fontFamily: 'serif',
				fontVariant: 'thin',
				textAlign: 'center'
			});
			
			circlePanel.add(drawComponent1);
			this.getSummaryViewGdp().add(circlePanel);

			this.getSummaryViewGdp().add({
				xtype: 'panel',
				layout: 'card',
				height: '10%',
				width: '100%',
				style: 'text-align: center',
				html: "<div>GDP per capita</div>"
			});
		}
	}
});
