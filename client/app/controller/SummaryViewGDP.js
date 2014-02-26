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
		
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;

		var settingsRecords = [];
		var dataPointsRecords = [];
		
		var maxGDP = 0;
		var currentGDP;
		
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
				this.getSummaryViewGDP().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}
		
		function setData(records, operation, success) {
			// Visualisation code starts here
			dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
			var dataSetID = this.getSummaryViewGDP().getDataSet();
			dataPointsStore.filter([Ext.create('Ext.util.Filter', { filterFn: function(dataPoint) {
					var currentValue = parseInt(dataPoint.get('value'));
					if (currentValue > maxGDP) maxGDP = currentValue;
					return true;
				}})
			]);
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
				Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewGDP().getDataSet() })
			]);
			currentGDP = dataPointsStore.last().get('value');
			console.log(currentGDP);
			console.log(maxGDP);
			console.log(currentGDP/maxGDP);
		
			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		
			var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		
			height = height*0.9;
		
			var centrex = width/2, centrey = (height-46-28)/2, circler = ((centrex < centrey) ? centrex : centrey) * (currentGDP/maxGDP) * 0.9;
		
			var colourString = '#79BB3F';			
			
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
						fill: colourString,
						radius: circler,
						x: centrex,
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
				html: "<div>GDP per capita is $" + parseFloat(currentGDP).toFixed(2) +"</div>"
			});
		}
	}
});
