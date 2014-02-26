Ext.define('moneyworld.controller.DetailedViewMortality', {
	extend: 'moneyworld.controller.DetailedView',
	requires: [
		'Ext.chart.interactions.PanZoom'
	],
	config: {
		refs: {
			mainView: 'main',
			detailedViewMortality: 'detailedview_mortality',
		},
		control: {
			'detailedViewMortality': {
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
				this.getDetailedViewMortality().getDataSet(),
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
								stroke: '#dddddd',
								lineWidth: 3,
								shadowColor: 'rgba(0,0,0,0.7)',
								shadowBlur: 10,
								shadowOffsetX: 3,
								shadowOffsetY: 3
							},
							marker: {
								type: 'circle',
								stroke: '#000000',
								fill: '#777777',
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
							title: {
								text: dataSetsStore.findRecord('id', this.getDetailedViewMortality().getDataSet()).get('name'),
								color: "#dddddd",
								fontSize: "1.0em"
							},
							grid: true,
							style: {
								estStepSize: 20,
								stroke: "#dddddd"
							},
							label: {
								color: "#dddddd"
							},
							minimum: Math.floor(Number(dataPointsStore.min('value'))-1),
							maximum: Math.ceil(Number(dataPointsStore.max('value'))+1)
						},
						{
							type: 'numeric',
							position: 'bottom',
							title: {
								text: 'Year',
								color: "#dddddd",
								fontSize: "1.0em"
							},
							grid: true,
							style: {
								estStepSize: 20,
								stroke: "#dddddd"
							},
							label: {
								color: "#dddddd"
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
			this.getDetailedViewMortality().add(chart);
			// Visualisation code ends here
		}
	}
});
