Ext.define('moneyworld.controller.DetailedViewUnemp', {
	extend: 'moneyworld.controller.DetailedView',
	
	config: {
		refs: {
			mainView: 'main',
			detailedViewUnemp: 'detailedview_unemp',
		},
		control: {
			'detailedViewUnemp': {
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
				this.getDetailedViewUnemp().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			// Visualisation code starts here
			var chart = Ext.create('Ext.chart.CartesianChart', {
					flex: 1,

					background: 'none',
					store: {},
					series: [
						{
							type: 'line',
							xField: 'year',
							yField: 'value',
							style: {
								stroke: '#115fa6',
								lineWidth: 3,
								shadowColor: 'rgba(0,0,0,0.7)',
								shadowBlur: 10,
								shadowOffsetX: 3,
								shadowOffsetY: 3
							},
							marker: {
								type: 'circle',
								stroke: '#0d1f96',
								fill: '#115fa6',
								lineWidth: 2,
								radius: 4,
								shadowColor: 'rgba(0,0,0,0.7)',
								shadowBlur: 10,
								shadowOffsetX: 3,
								shadowOffsetY: 3
							}
						}
					],
					axes: [
						{
							type: 'numeric',
							position: 'left',
							title: dataSetsStore.findRecord('id', this.getDetailedViewUnemp().getDataSet()).get('name'),
							grid: true,
							style: {
								estStepSize: 20
							},
							minimum: Math.floor(Number(dataPointsStore.min('value'))-1),
							maximum: Math.ceil(Number(dataPointsStore.max('value'))+1)
						},
						{
							type: 'numeric',
							position: 'bottom',
							title: 'Year',
							grid: true,
							style: {
								estStepSize: 20
							},
							visibleRange: [0.66, 1],
							minimum: Math.floor(Number(dataPointsStore.min('year'))-1),
							maximum: Math.ceil(Number(dataPointsStore.max('year'))+1),
							renderer: function(v) { return v.toFixed(0); }
						}
					],
					interactions: [
						{
							type: 'iteminfo',
							gesture: 'itemtap',
							listeners: {
								show: function (me, item, panel) {
									panel.setHtml(item.record.data.year + ": " + item.record.data.value);
								}
							}
						},
						'panzoom'
					]
			});

			chart.setStore(dataPointsStore);
			this.getDetailedViewUnemp().add(chart);
			// Visualisation code ends here
		}
	}
});
