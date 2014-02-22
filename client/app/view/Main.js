Ext.define('moneyworld.view.Main', {
	extend: 'Ext.navigation.View',
	xtype: 'main',
	requires: [
		'moneyworld.view.Overview',
		'moneyworld.view.DetailedView',
		'moneyworld.view.DetailedViewUnemp',
		'moneyworld.view.DetailedViewGini',
		'moneyworld.view.DetailedViewMortality',
		'moneyworld.view.DetailedViewLifeExpectancy',
		'moneyworld.view.MapView',
		'moneyworld.view.Settings'
	],
	config: {
		navigationBar: {
			docked: 'top',
			items: [
				{
					iconCls: 'home',
					action: 'countrymode',
					align: 'left'
				},
				{
					iconCls: 'browser',
					action: 'regionmode',
					align: 'left'
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
