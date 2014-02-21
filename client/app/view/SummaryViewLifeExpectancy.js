Ext.define('moneyworld.view.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_lifeExpectancy',
	id: 'summaryview_lifeExpectancy',
	requires: [],
	config: {
		items: [{
			xtype: 'label',
			html: '<center>Life Expectancy</center><canvas id="testtesttest"  style="width:100%; height:100%; border:1px solid black" width="1260" height="600">[No canvas support]</canvas>'
		}],
		listeners: {
			// I had to do this because the controller cannot register this event
			painted: function() {
				this.fireEvent("woohoo", this); 
				// Ext.Msg.alert('I was painted to the screen');
			}
		},
		dataSet: 'SL.UEM.TOTL.ZS',
		dataSetInternal: 'LifeExpectancy',
	}
});