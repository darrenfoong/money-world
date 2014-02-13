Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Panel',
	xtype: 'overview',
	requires: [
	],
	config: {
		title: "Overview",

		fullscreen: true,
		layout: 'vbox',

		items: [
			{
				xtype: 'container',
				flex: 1,

				styleHtmlContent: true,
				scrollable: true,
			},
			{
				xtype: 'maintileview',
				flex: 2,

				styleHtmlContent: true,
				scrollable: true
			}
		]
	}
});
