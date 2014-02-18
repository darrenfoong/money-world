Ext.define('moneyworld.view.SummaryView', {
	extend: 'Ext.Panel',
	xtype: 'summaryview',
	requires: [
	],
	config: {
		dataSet: null,
		country: null,
		year: null,

		dataSetInternal: null,

		height: '95%',

		html: ''
	}
});
