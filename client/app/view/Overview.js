Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Carousel',
	xtype: 'overview',
	requires: [
		'moneyworld.view.SummaryView',
		'moneyworld.view.SummaryViewUnemp',
		'moneyworld.view.SummaryViewMortality',
		'moneyworld.view.SummaryViewGini'
	],
	config: {
		xtype: 'carousel',

		title: null,

		items: [
			{
				xtype: 'summaryview_unemp'
			},
			{
				xtype: 'summaryview_gini',
				height: '95%'
			},
			{
				xtype: 'summaryview_mortality',
				height: '95%'
			}
		]
	}
});
