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

				store: {
					fields: ['dataset', 'value'],
					data: [
						{dataset: 'GDP', value: 100},
						{dataset: 'Gini', value: 21},
						{dataset: 'HDI', value: 24},
						{dataset: 'Population', value: 24},
						{dataset: 'Inflation', value: 26}
					]
				}
			}
		]
	}
});
