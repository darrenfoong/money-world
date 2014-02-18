/**
 * Demonstrates how use Ext.chart.ColumnChartStacked
 */
//<feature charts>
Ext.define('moneyworld.view.ColumnChartStacked', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'
    ],
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [{
            xtype: 'chart',
            store: 'BarLabel',
            colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
            // background: 'white',
            series: [{
                type: 'bar',
                xField: 'year',
                yField: ["top100", "top80", "top60", "top40", "top20"],
                title:["0-20th Percentile","20-40th Percentile","40-60th Percentile","60-80th Percentile","80-100th Percentile"],
                stacked: true,
                style: {
                    // stroke: 'rgb(40,40,40)'
                },
                // renderer: function(sprite, record, attr, index, store) {                       
                //         // var color = selectedColor;
                //             return Ext.apply(attr, {
                //                 // fill: color,
                //                 width: '50%',

                //             });
                //     },
            }],
            axes: [
            {
                type: 'numeric',
                hidden: true,
                // position: 'left',
                // label: {
                //     rotate: {
                //         degrees: -30
                //     }
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
        }]
    }
});