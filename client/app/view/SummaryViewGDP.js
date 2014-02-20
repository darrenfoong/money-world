Ext.define('moneyworld.view.SummaryViewGDP', {
	extend: 'moneyworld.view.SummaryViewCircle',
	xtype: 'summaryview_gdp',
	requires: [
		'Ext.draw.*'
	],
	config: {
		dataSet: null, //find GDP stuff
		country: null,
		year: null,

		dataSetInternal: null,

		height: '95%',

		//html: '<text>Hello World!</text>',
		/*
		items: [{
        	xtype: 'draw',
            sprites: [
        	{
            type: 'circle',
            fillStyle: '#ff8',
            strokeStyle: 'black',
            lineWidth: 3,
            radius: 100,
            x: 100,
            y: 100
        	}]
    	}]*/
	},
	initialize: function() {
		alert("working");
		new Ext.draw.Component({
  			fullscreen: true,
  			items: [{
    		type: 'circle',
    		cx: 100,
    		cy: 100,
    		r: 25,
    		fillStyle: 'blue'
  		}]
		});
	}
});
