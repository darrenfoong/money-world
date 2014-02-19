Ext.define('moneyworld.view.SummaryViewGini', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gini',
	requires: [
		'moneyworld.view.ColumnChartStacked'
	],
	config: {
		dataSet: 'SI.POV.GINI',
		dataSetInternal: 'Gini',

		cls: 'card1',
		layout: 'fit',
		items: [{
			xtype: 'chart',
			store: 'BarLabel',
			title: "total",
			colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
			legend: {
				xtype: 'legend',
				docked: 'left',
				scrollable: false,
			},
			interactions: [{
				type: 'panzoom'
			}],
			series: [{
				type: 'bar',
				xField: 'year',
				yField: ["top100", "top80", "top60", "top40", "top20"],
				title: ["0-20th Percentile", "20-40th Percentile", "40-60th Percentile", "60-80th Percentile", "80-100th Percentile"],
				stacked: true,
				// style: {
				// 	stroke: 'rgb(40,40,40)'
				// },
			}],
			axes: [{
				type: 'numeric',
				hidden: true

			}, {
				type: 'category',
				position: 'bottom',
				hidden: true
				// fields: 'year',
				// visibleRange: [0, 0.5]
			}]
		}]
	}
});