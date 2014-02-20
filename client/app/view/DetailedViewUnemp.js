Ext.define('moneyworld.view.DetailedViewUnemp', {
	extend: 'moneyworld.view.DetailedView',
	xtype: 'detailedview_unemp',
	requires: [
	],
	config: {
		items: [
			{
				xtype: 'carousel',
				flex: 1,

				items: [
					{
						xtype: 'chart',
						background: 'none',
						store: null,
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
