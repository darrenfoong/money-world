Ext.define('moneyworld.view.Overview', {
	extend: 'Ext.Carousel',
	xtype: 'overview',
	requires: [
		'moneyworld.view.SummaryView',
		'moneyworld.view.SummaryViewInflation',
		'moneyworld.view.SummaryViewUnemp',
		'moneyworld.view.SummaryViewMortality',
		'moneyworld.view.SummaryViewLifeExpectancy',
		'moneyworld.view.SummaryViewGini',
		'moneyworld.view.SummaryViewGdp'
	],
	config: {
		xtype: 'carousel',

		title: null,

		padding: 0,

		items: [
			{
				xtype: 'summaryview_gdp'
			},
			{
				xtype: 'summaryview_unemp'
			},
			{
				xtype: 'summaryview_gini'
			},
			{
				xtype: 'summaryview_lifeExpectancy'
			},
			{
				xtype: 'summaryview_inflation'
			},
			{
				xtype: 'summaryview_mortality'
			}
		]
	}
});
