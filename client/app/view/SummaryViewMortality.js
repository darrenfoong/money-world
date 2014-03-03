Ext.define('moneyworld.view.SummaryViewMortality', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_mortality',
	requires: [],
	config: {
		dataSet: 'SP.DYN.CDRT.IN',
		dataSetInternal: 'Mortality',
		direction: 1,
		
		fullscreen: true,
		layout: 'vbox',
		items: [{
			xtype: 'label',
			html: '<center>Mortality</center>'
		}, {
			title: 'GeoMap',
			xtype: 'geomapview1',
			flex: 9,
			cls: 'center',
			width: '90%',
			// margin: '0px 30px 0px 30px',
		}
		],
		listeners: {
			// I had to do this because the controller cannot register this event
			painted: function() {
				this.fireEvent("drawMap", this); 
			}
		},
	}
});