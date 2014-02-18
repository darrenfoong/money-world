Ext.define('moneyworld.view.SummaryViewMortality', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_mortality',
	requires: [
	],
	config: {
		dataSet: 'SP.DYN.CDRT.IN',
		dataSetInternal: 'Mortality',

		html: '<iframe style="position: absolute; width: 100%; height: 100%;" src="app/viz/mortality_view/index.html"/>'
	}
});
