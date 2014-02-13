Ext.define('moneyworld.view.MainTileView', {
	// extend: 'Ext.dataview.DataView',
	extend: 'Ext.List',
	xtype: 'maintileview',
	requires: [
		'Ext.data.Store'
	],
	config: {
		styleHtmlContent: true,

		layout: {
			type: 'fit'
		},

		inline: {
			wrap: true
		},

		store: {},

		itemCls: 'tileview-item',

		itemTpl: ''
	}
});
