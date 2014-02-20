Ext.define('moneyworld.view.SummaryViewGDP', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gdp',
	requires: [
		'Ext.draw.*',
		'moneyworld.view.SampleDraw'
	],
	config: {
		dataSet: null, //find GDP stuff
		country: null,
		year: null,

		dataSetInternal: null,

		height: '95%',

		items:[
			/*{
			xtype: 'panel',
			layout: 'card',
			height: '90%',
			width: '100%',
			style: {
				background: 'red'
			},
			initialize: function() {
				var drawComponent1 = Ext.create('Ext.draw.Component', {});
				drawComponent1.getSurface('main').add({
					type: 'circle',
					fill: '#79BB3F',
					radius: 100,
					x: 100,
					y: 100
				});
					
				drawComponent1.getSurface('main').add({
					type: "path",
					path: "M200 200 L270 205",
					fill: "blue",
					lineWidth: 7,
					fillStyle: 'rgba(155, 0, 255, .2)',
					strokeStyle: 'purple',
					id: 'hoursHand',
					rotationRads: 1,
					rotationCenterX: 200,
					rotationCenterY: 200
				});
				this.add(drawComponent1);
			}
		}*/
		]
	},
});
