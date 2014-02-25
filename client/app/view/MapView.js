Ext.define('moneyworld.view.MapView', {
	extend: 'Ext.TabPanel',
	xtype: 'mapview',
	requires: [
		'moneyworld.view.GeoMapView'
	],
	config: {
		title: null,

		dataSet: null,

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
