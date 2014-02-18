Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Carousel',
	xtype: 'overview',
	requires: [
		'moneyworld.view.SummaryView',
		'moneyworld.view.SummaryViewUnemp',
		'moneyworld.view.SummaryViewGini'
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
