Ext.define('moneyworld.view.Main', {
	extend: 'Ext.navigation.View',
	xtype: 'main',
	requires: [
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
					iconCls: 'maps',
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
