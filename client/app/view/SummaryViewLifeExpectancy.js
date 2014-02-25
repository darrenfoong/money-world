Ext.define('moneyworld.view.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_lifeExpectancy',
	id: 'summaryview_lifeExpectancy',
	requires: [],
	config: {
		items: [{
			xtype: 'label',
			html: '<span class="indicator-heading" style="font-size:+5">The average person lives up to</span>'
		}],
		listeners: {
			// I had to do this because the controller cannot register this event
			painted: function() {
				this.fireEvent("woohoo", this); 
				// Ext.Msg.alert('I was painted to the screen');
			}
		},
		dataSet: 'SP.DYN.LE00.IN',
		dataSetInternal: 'LifeExpectancy',
	}
});
