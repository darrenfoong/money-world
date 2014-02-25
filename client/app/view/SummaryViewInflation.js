Ext.define('moneyworld.view.SummaryViewInflation', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_inflation',
	requires: [
	],
	config: {
		dataSet: 'FP.CPI.TOTL.ZG',
		dataSetInternal: 'Inflation',
		items: [{
			xtype: 'label',
			html: '<center><span class="indicator-heading">Inflation</span></center><canvas id="testtesttest"  style="width:100%; height:100%; border:1px solid black" width="1260" height="600">[No canvas support]</canvas>'
		}],
		// listeners: {
		// 	// I had to do this because the controller cannot register this event
		// 	painted: function() {
		// 		this.fireEvent("woohoo", this); 
		// 		// Ext.Msg.alert('I was painted to the screen');
		// 	}
		// },
	},
});
