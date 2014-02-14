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

		items: [
			{
				xtype: 'carousel',
				flex: 1,

				items: [
					{
						html: 'Visualisation 1'
					},
					{
						html: 'Visualisation 2'
					}
				]
			},
			{
				flex: 1,

				html: 'DetailedView information here'
			}
		]
	}
});
