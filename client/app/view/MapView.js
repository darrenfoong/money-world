Ext.define('moneyworld.view.MapView', {
	extend: 'Ext.Panel',
	xtype: 'mapview',
	requires: [
		'moneyworld.view.GeoMapView'
	],
	valueBox:null,
	sliderBar:null,
	onSliderChange:function(me, sl, thumb, newValue, oldValue, eOpts){
		this.valueBox.setHtml(newValue);
		this.fireEvent('drawMap', newValue);
		//pass on the task to drawMap
	},
	initialize: function(){
		this.valueBox = Ext.create('Ext.Label', {html:'2005'}),
		this.add(this.valueBox);
		this.sliderBar = Ext.create('Ext.field.Slider',{
			label: 'year',
			value: 2005,
			minValue: 2005,
			maxValue: 2010,
			flex: 1,
		});
		this.add(this.sliderBar);
		this.sliderBar.on({
            change: this.onSliderChange, 
            scope: this
        });

	},
	config: {
		direction:0,
		title: null,
		dataSet: null,
		fullscreen: true,
		layout: 'vbox',
		items: [{
			title: 'GeoMap',
			xtype: 'geomapview',
			flex: 9
		}]
	}
});