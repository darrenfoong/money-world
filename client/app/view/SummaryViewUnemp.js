Ext.define('moneyworld.view.SummaryViewUnemp', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_unemp',
	requires: [
	],
	config: {
		dataSet: 'SL.UEM.TOTL.ZS',
		dataSetInternal: 'Unemp',
		direction: 1
	}
});
