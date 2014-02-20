Ext.define('moneyworld.view.SummaryViewCircle', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_circle',
	requires: [
		'Ext.draw.*'
	],
	config: {
		dataSet: null,
		country: null,
		year: null,

		dataSetInternal: null,

		height: '95%',

		//html: '<text>Hello Worlds!</text>'
	}
});
