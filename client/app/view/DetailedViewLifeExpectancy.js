Ext.define('moneyworld.view.DetailedViewLifeExpectancy', {
	extend: 'moneyworld.view.DetailedView',
	xtype: 'detailedview_lifeExpectancy',
	requires: [
	],
	config: {
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
