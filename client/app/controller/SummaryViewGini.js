Ext.define('moneyworld.controller.SummaryViewGini', {
	extend: 'moneyworld.controller.SummaryView',
	
	config: {
		refs: {
			mainView: 'main',
			summaryViewGini: 'summaryview_gini'
		},
		control: {
			'summaryViewGini': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
	}
});
