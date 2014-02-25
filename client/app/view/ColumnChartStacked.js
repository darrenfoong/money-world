/**
 * Demonstrates how use Ext.chart.ColumnChartStacked
 */
//<feature charts>
Ext.define('moneyworld.view.ColumnChartStacked', {
    extend: 'Ext.Panel',
    xtype: 'myOwnChart',
    requires: ['Ext.chart.Chart', 'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'],
    config: {
        height: '90%',
        layout: 'fit',
        items: [{
            xtype: 'chart',
            legend: {
                position: 'left'
            },
            store: 'BarLabel',
            colors: ['#55C5FC', '#2E9A9C', '#FCD70D', '#B76E20', "#A13E27"],
            series: [{
                label: {
                    field: ["top20", "", "", "", ""],
                    display: 'insideEnd',
                    orientation: 'horizontal',
                    color: '#FF0000',
                    // contrast: true,
                    renderer: function(value) {
                        return value + "%";
                    //     return "Top 20% earns " + value.toString() + "% of the total salary";
                    }
                },
                type: 'bar',
                xField: 'year',
                yField: ["top20", "top40", "top60", "top80", "top100"],
                title: ["Top 20%", "Top 20-40%", "Top 40-60%", "Top 60-80%", "Bottom 20%"],
                stacked: true,
                style: {
                    // stroke: 'rgb(40,40,40)'
                },
            }],
            axes: [{
                type: 'numeric',
                hidden: true,
            }, {
                type: 'category',
                // position: 'top',
                // increment: 0,
                hidden: true
            }]
        }]
    }
});