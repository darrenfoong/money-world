Ext.define('moneyworld.view.Init', {
	extend: 'Ext.Panel',
	xtype: 'init',
	requires: [
		'Ext.TitleBar',
	],
	config: {
		fullscreen: true,
		styleHtmlContent: true,
		layout: 'fit',

		items: [
			{
				docked: 'top',
				xtype: 'titlebar',
				title: 'Getting Started'
			},
			{
				xtype: 'settings'
			}
		]
	}
});
