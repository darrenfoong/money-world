Ext.define('moneyworld.view.SampleDraw', {
	requires: ['Ext.draw.*'],
	extend: 'Ext.Container',
	xtype: 'SampleDraw',
	config: {
		items: [{
			xtype: 'panel',
			layout: 'card',
			height: '50%',
			width: '100%',
			style: {
				background: 'red'
			},
			initialize: function() {
				var drawComponent1 = Ext.create('Ext.draw.Component', {});
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
		}],
		html: "Extra space",
	}
});