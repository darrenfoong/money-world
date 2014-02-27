Ext.define('moneyworld.view.MapView', {
	extend: 'Ext.Panel',
	xtype: 'mapview',
	requires: [
		'moneyworld.view.GeoMapView'
	],
	config: {
		title: null,

		dataSet: null,

		fullscreen: true,
		layout: 'vbox',

		items: [
			{
				title: 'GeoMap',
				xtype: 'geomapview',
				flex: 1
			}
		]
	}
});
