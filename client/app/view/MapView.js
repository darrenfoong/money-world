Ext.define('moneyworld.view.MapView', {
	extend: 'Ext.TabPanel',
	xtype: 'mapview',
	requires: [
		'moneyworld.view.GeoMapView'
	],
	config: {
		title: 'MapView',

		fullscreen: true,
		tabBarPosition: 'top',

		items: [
			{
				title: 'GeoMap',
				xtype: 'geomapview'
			},
			{
				title: 'TreeMap',
				html: 'TreeMap'
			}
		]
	}
});
