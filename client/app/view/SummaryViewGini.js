Ext.define('moneyworld.view.SummaryViewGini', {
	extend: 'moneyworld.view.SummaryView',
	xtype: 'summaryview_gini',
	requires: [
		'moneyworld.view.ColumnChartStacked'
	],
	config: {
		dataSet: 'SI.POV.GINI',
		dataSetInternal: 'Gini',

		cls: 'card1',
		layout: 'fit',
		items: [
			{
				xtype: 'toolbar',
				cls: 'charttoolbar',
				top: 0,
				right: 0,
				zIndex: 50,
				style: {
					background: 'none'
				},
				items: [
					// {
					//	 xtype: 'spacer'
					// }, {
					//	 iconCls: 'refresh',
					//	 handler: function() {
					//		 Ext.getStore('OrderItems').generateData(25);
					//	 }
					// }, {
					//	 iconCls: 'network',
					//	 text: 'Group',
					//	 handler: function(button) {
					//		 var chart = Ext.ComponentQuery.query('chart', this.getParent().getParent())[0],
					//			 series = chart.getSeries()[0];
					//		 button.setText(series.getStacked() ? 'Stack' : 'Group');
					//		 series.setStacked(!series.getStacked());
					//		 chart.redraw();
					//	 }
					// }, {
					//	 text: 'Reset',
					//	 handler: function() {
					//		 //ensure the query gets the chart for this kitchensink example
					//		 var chart = Ext.ComponentQuery.query('chart', this.getParent().getParent())[0];

					//		 //reset the axis
					//		 Ext.ComponentQuery.query('axis', chart)[1].setVisibleRange([0, 0.5]);
					//		 chart.redraw();
					//	 }
					// }
				]
			},
			{
				xtype: 'chart',
				store: 'BarLabel',
				title: "total",
				colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
				legend: {
					docked: 'top',
					verticalWidth: 100
				},
				// background: 'white',
				series: [{
					type: 'bar',
					xField: 'year',
					yField: ["top100", "top80", "top60", "top40", "top20"],
					title:["0-20th Percentile","20-40th Percentile","40-60th Percentile","60-80th Percentile","80-100th Percentile"],
					stacked: true,
					style: {
						stroke: 'rgb(40,40,40)'
					},
					pointWidth: 100,
					// renderer: function(sprite, record, attr, index, store) {					   
					//		 // var color = selectedColor;
					//			 return Ext.apply(attr, {
					//				 // fill: color,
					//				 width: '50%',

					//			 });
					//	 },
				}],
				axes: [
				{
					type: 'numeric',
					hidden: true
					// position: 'left',
					// label: {
					//	 rotate: {
					//		 degrees: -30
					//	 }
					// }
				}, 
				{
					type: 'category',
					position: 'bottom',
					hidden: true
					// fields: 'year',
					// title: 'test'
					// visibleRange: [0, 0.5]
				}
				]
			}
		]
	}
});
