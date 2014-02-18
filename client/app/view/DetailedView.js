Ext.define('moneyworld.view.DetailedView', {
	extend: 'Ext.Panel',
	xtype: 'detailedview',
	requires: [
	],
	config: {
		title: null,

		dataSet: null,
		country: null,

		styleHtmlContent: true,
		fullscreen: true,
		layout: 'vbox',
	}
});
