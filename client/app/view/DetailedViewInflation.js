Ext.define('moneyworld.view.DetailedViewInflation', {
	extend: 'moneyworld.view.DetailedView',
	xtype: 'detailedview_inflation',
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
