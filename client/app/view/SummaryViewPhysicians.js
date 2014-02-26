Ext.define('moneyworld.view.SummaryViewPhysicians', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_physicians',
	requires: [
	],
	config: {
		dataSet: 'SH.MED.PHYS.ZS',
		dataSetInternal: 'Physicians',

		html: ''
	}
});
