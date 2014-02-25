Ext.define('moneyworld.view.Main', {
	extend: 'Ext.navigation.View',
	xtype: 'main',
	requires: [
		'moneyworld.view.Overview',
		'moneyworld.view.DetailedView',
		'moneyworld.view.DetailedViewInflation',
		'moneyworld.view.DetailedViewUnemp',
		'moneyworld.view.DetailedViewGini',
		'moneyworld.view.DetailedViewMortality',
		'moneyworld.view.DetailedViewLifeExpectancy',
		'moneyworld.view.MapView',
		'moneyworld.view.InfoView',
		'moneyworld.view.Settings'
	],
	config: {
		navigationBar: {
			docked: 'top',
			items: [
				{
					iconCls: 'maps',
					action: 'mapview',
					align: 'left'
				},
				{
					iconCls: 'info',
					action: 'infoview',
					align: 'right'
				},
				{
					iconCls: 'settings',
					action: 'settings',
					align: 'right'
				}
			]
		},

		items: [
			{
				xtype: 'overview'
			}
		]
	}
});
