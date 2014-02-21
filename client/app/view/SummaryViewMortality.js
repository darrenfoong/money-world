Ext.define('moneyworld.view.SummaryViewMortality', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_mortality',
	requires: [
	],
	config: {
		dataSet: 'SP.DYN.CDRT.IN',
		dataSetInternal: 'Mortality',
items: [
		{
			xtype: 'label',
			html: '<center>Mortality</center>' 
		}]
	}
});
