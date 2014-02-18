Ext.define('moneyworld.controller.SummaryViewMortality', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewMortality: 'summaryview_mortality'
		},
		control: {
			'summaryViewMortality': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
		// var htmlString = 'sdaff<div id="wrapper" style="width:100%; height:100%; background:blue;"> <div id="adult_tomb" style="position:relative; width:50%;height:100%; float:left"> <div class="tomb_value" style=" position:absolute;top:0; height:40; width:100%; margin: 0 auto; text-align:center "></div> <div class="tomb_picture" style=" position:absolute; bottom:0; width:100%; margin: 0 auto;"></div> </div> <div id="child_tomb" style="position:relative; width:50%;height:100%;  float:left"> <div class="tomb_value" style=" position:absolute;top:0; height:40; width:100%; margin: 0 auto; text-align:center "></div> <div class="tomb_picture" style=" position:absolute; bottom:0; width:100%; margin: 0 auto;"></div> </div> </div> <!-- templates --> <img id="tomb_img" src="halloween_rounded_tombstone.png" style="display:none; margin: 0 auto;">';
	}
});
