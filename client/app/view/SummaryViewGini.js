Ext.define('moneyworld.view.SummaryViewGini', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gini',
	requires: [
		'moneyworld.view.ColumnChartStacked'
	],
	config: {
		dataSet: 'SI.POV.GINI',
		dataSetInternal: 'Gini',
		cls: 'chartpanel',
		layout: 'fit',
		iconCls: 'line',
		items: [{
			flex: 1,
			xtype: 'label',
		},

		{
			flex: 1,
			xtype: 'chart',
			config:{title: 'Life EXPECTANCY'},
			store: 'BarLabel',
			colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
			legend: {
				label: "hi",
				xtype: 'legend',
				docked: 'left',
				scrollable: false,
			},
			series: [{
				type: 'bar',
				xField: 'year',
				yField: ["top100", "top80", "top60", "top40", "top20"],
				title: ["Top 20%", "Next 20%", "Third 20%", "Fourth 20%", "Last 20%"],
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