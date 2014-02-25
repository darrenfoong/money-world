Ext.define('moneyworld.view.SummaryViewGini', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gini',
	requires: [
		'moneyworld.view.ColumnChartStacked',
		'Ext.chart.series.Line',
		'Ext.chart.interactions.ItemInfo'
	],
	config: {
		layout: {
			type: 'fit'
		},
		dataSet: 'SI.POV.GINI',
		dataSetInternal: 'Gini',
		items: [{
				xtype: 'panel',
				flex: 1,
				html: '<center><span class="indicator-heading">Income Inequality</span></center>'
			},
			{
				xtype: 'myOwnChart',
				store: 'BarLabel',
				flex: 4,
				docked: 'bottom',
			}
		]
	},
});