Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Carousel',
	xtype: 'overview',
	requires: [
	],
	config: {
		xtype: 'carousel',

		title: null,

		styleHtmlContent: true,

		items: [
			{
				xtype: 'summaryview',
				dataSet: 'NY.GDP.MKTP.CD',
				html: '<h1>1</h1>'
			},
			{
				xtype: 'summaryview',
				dataSet: 'NY.GDP.MKTP.KD.ZG',
				html: '<h1>2</h1>'
			},
			{
				xtype: 'summaryview',
				dataSet: 'NY.GDP.PCAP.CD',
				html: '<h1>3</h1>'
			},
			{
				xtype: 'summaryview',
				dataSet: 'SI.POV.GINI',
				html: '<h1>4</h1>'
			},
			{
				xtype: 'summaryview',
				dataSet: 'SL.UEM.TOTL.ZS',
				html: '<h1>5</h1>'
			}
		]
	}
});
