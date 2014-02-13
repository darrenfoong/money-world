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

		itemCls: 'tileview-item',

		itemTpl: '{dataset} - {value}'
		// itemTpl: '<div><h1>{dataset}</h1><div class="tileview-item-{dataset}"></div><span>{value}</span></div>',
	}
});
