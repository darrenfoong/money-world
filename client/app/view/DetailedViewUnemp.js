Ext.define('moneyworld.view.DetailedViewUnemp', {
	extend: 'moneyworld.view.DetailedView',
	xtype: 'detailedview_unemp',
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
