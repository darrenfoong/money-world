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
				xtype: 'summaryview_unemp'
			},
			{
				xtype: 'summaryview_gini'
			}
		]
	}
});
