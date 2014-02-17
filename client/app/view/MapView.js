Ext.define('moneyworld.view.MapView', {
	extend: 'Ext.Panel',
	xtype: 'mapview',
	requires: [
	],
	config: {
		title: "MapView",
		html: '<iframe style="position: absolute; width: 100%; height: 100%;" src="app/viz/map_view/index.html"/>'
	}
});
