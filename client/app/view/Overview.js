Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Carousel',
	xtype: 'overview',
	requires: [
		'moneyworld.view.SummaryView',
		'moneyworld.view.SummaryViewUnemp',
		'moneyworld.view.SummaryViewMortality',
		'moneyworld.view.SummaryViewLifeExpectancy',
		'moneyworld.view.SummaryViewGini'
	],
	config: {
		xtype: 'carousel',

		title: null,

		padding: 0,

		items: [
			{
				xtype: 'summaryview_lifeExpectancy'
			},
			{
				xtype: 'summaryview_gini'
			},
			{
				xtype: 'summaryview_mortality'
			},
			{
				xtype: 'summaryview_unemp'
			}
		]
	}
});
