Ext.define('moneyworld.view.SummaryViewGdp', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gdp',
	requires: [
		'Ext.draw.*',
		'moneyworld.view.SampleDraw'
	],
	config: {
		dataSet: "NY.GDP.PCAP.PP.CD", //find GDP stuff
		dataSetInternal: "Gdp",
		height: '95%',
	},
});
