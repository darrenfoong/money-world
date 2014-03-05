Ext.define('moneyworld.view.InfoView', {
	extend: 'Ext.Panel',
	xtype: 'infoview',
	requires: [
	],
	config: {
		title: null,
scrollable: true,
		dataSet: null,
		country: null,

		styleHtmlContent: true,
		fullscreen: true,
		layout: 'vbox'
	}
});
