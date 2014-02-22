Ext.define('moneyworld.view.SummaryViewGini', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gini',
	requires: [
		'moneyworld.view.ColumnChartStacked',
				'Ext.chart.series.Line',
		'Ext.chart.interactions.ItemInfo'
	],
	config: {
		dataSet: 'SI.POV.GINI',
		dataSetInternal: 'Gini',
		items: [{
				xtype: 'panel',
								flex: 1,
				html: '<center><h1>Life EXPECTANCY</h1></center>'
			},

			{
				xtype: 'carousel',
				flex: 9,
				
				items: [
					// {
					// 	flex: 1,
					// 	xtype: 'chart',
					// 	store: 'BarLabel',
					// 	colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
					// 	legend: {
					// 		xtype: 'legend',
					// 		docked: 'left',
					// 		scrollable: false,
					// 	},
					// 	series: [{
					// 		type: 'bar',
					// 		xField: 'year',
					// 		yField: ["top100", "top80", "top60", "top40", "top20"],
					// 		title: ["Top 20%", "Next 20%", "Third 20%", "Fourth 20%", "Last 20%"],
					// 		stacked: true,
					// 		// style: {
					// 		// 	stroke: 'rgb(40,40,40)'
					// 		// },
					// 	}],
					// 	axes: [{
					// 		type: 'numeric',
					// 		hidden: true

					// 	}, {
					// 		type: 'category',
					// 		position: 'bottom',
					// 		hidden: true
					// 		// fields: 'year',
					// 		// visibleRange: [0, 0.5]
					// 	}]
					// }]

				{
					xtype: 'chart',
					flex: 4,
					background: 'none',
					store: null,
					series: [{
						type: 'line',
						xField: 'year',
						yField: 'value',
						title: 'Line',
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
							shadowOffsetY: 3,
							fx: {
								duration: 300
							}
						}
					}]
				}]
			}
		]
	}
});
