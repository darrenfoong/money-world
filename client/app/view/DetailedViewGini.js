Ext.define('moneyworld.view.DetailedViewGini', {
	extend: 'moneyworld.view.DetailedView',
	xtype: 'detailedview_gini',
	requires: [
		'Ext.chart.series.Line',
		'Ext.chart.interactions.ItemInfo'
	],
	config: {
		items: [
			{
				xtype: 'panel',
				flex: 1,
				html: 'Sample text'
			},
			{
				xtype: 'carousel',
				flex: 9,

				items: [
					{
						xtype: 'chart',
						flex: 4,
						background: 'none',
						store: 'BarLabel',
						series: [
							{
								type: 'line',
								xField: 'year',
								yField: 'value',
								title: 'Line',
								style: {
									stroke: '#115fa6',
									lineWidth: 3,
									shadowColor: 'rgba(0,0,0,0.7)',
									shadowBlur: 10,
									shadowOffsetX: 3,
									shadowOffsetY: 3
								},
								marker: {
									type: 'circle',
									stroke: '#0d1f96',
									fill: '#115fa6',
									lineWidth: 2,
									radius: 4,
									shadowColor: 'rgba(0,0,0,0.7)',
									shadowBlur: 10,
									shadowOffsetX: 3,
									shadowOffsetY: 3,
									fx: {duration: 300}
								}
							}
						],
						interactions: [
							{
								type: 'iteminfo',
								gesture: 'itemtap',
								listeners: {
									show: function (me, item, panel) {
										panel.setHtml(item.record.data.year + ": " + item.record.data.value);
									}
								}
							}
						]
					}
				]
			}
		]

	}
});
