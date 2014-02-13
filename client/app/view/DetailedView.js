Ext.define('moneyworld.view.DetailedView', {
	extend: 'Ext.tab.Panel',
	xtype: 'detailedview',
	requires: [
	],
	config: {
		tabBarPosition: 'top',

		title: null,

		items: [
			{
				title: 'Visualisation',

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
						xtype: 'list',
						flex: 1,

						store: 	{
							fields: ['dataset'],
							data: [
								{dataset: 'GDP'},
								{dataset: 'Population'},
								{dataset: 'Gini coefficient'}
							]
						},

						itemTpl: ''
					}
				]
			},
			{
				title: 'Comments',

				styleHtmlContent: true,
				scrollable: true,

				html: [
					"Comments here"
				].join("")
			}
		]
	}
});
