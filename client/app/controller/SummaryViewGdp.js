Ext.define('moneyworld.controller.SummaryViewGdp', {
	extend: 'moneyworld.controller.SummaryView',
	requires: 'moneyworld.utils.Functions',

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
		this.getSummaryViewGdp().removeAll(true, true);
		console.log('refreshing');
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;
		var regionForRequest;

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
			regionForRequest = (currentRegion == 'Southern Africa') ? 'safrica' : 'wafrica';
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
				regionForRequest);
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
			if (currentGDP > maxGDP) maxGDP = currentGDP;
			console.log(maxGDP);
			//maxGDP = 9000;

			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

			var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

			height = height - 46 - 28;
			height = height * 0.88;

			var centrex = width / 2,
				centrey = height / 2 - 20,
				circler = ((centrex < centrey) ? centrex : centrey) * (currentGDP / maxGDP) * 0.9;
							
			var colourString = '#79BB3F';
			
			colourString = moneyworld.utils.Functions.getRangedColour(currentGDP / maxGDP);

			var circlePanel = Ext.create('Ext.draw.Component', {
				xtype: 'panel',
				layout: 'card',
				height: '88%',
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
				fontFamily: 'georgia',
				fontVariant: 'thin',
				textAlign: 'center'
			});
			
			circlePanel.add(drawComponent1);
			

			this.getSummaryViewGdp().add({
				xtype: 'panel',
				layout: 'card',
				height: '12%',
				width: '100%',
				style: {
					'text-align': 'center',
					'margin-top': '30px'
				},
				html: "<div style='font-size:3.5em; margin:0.25em'>GDP</div><div style='font-size:1.2em'>per capita</div>"
			});
			
			this.getSummaryViewGdp().add(circlePanel);
		}
	}
});
