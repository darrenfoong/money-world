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
		direction: 1
	},
});