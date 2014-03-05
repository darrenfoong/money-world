Ext.define('moneyworld.view.SummaryViewInflation', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_inflation',
	requires: [
	],
	config: {
		dataSet: 'FP.CPI.TOTL.ZG',
		dataSetInternal: 'Inflation',
		direction: 1
	},
});
