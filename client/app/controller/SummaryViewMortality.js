Ext.define('moneyworld.controller.SummaryViewMortality', {
    extend: 'moneyworld.controller.SummaryView',

    config: {
        refs: {
            mainView: 'main',
            summaryViewMortality: 'summaryview_mortality'
        },
        control: {
            'summaryViewMortality': {
                initialize: 'renderView',
                drawMap: 'drawMap'
            }
        }
    },
    sample2:null,
    currentCountry:null,
    dataSetRecord:null, //to pass to map so it formats things properly
    renderView: function() {
        var settingsStore = Ext.getStore('Settings');
        var dataSetsStore = Ext.getStore('DataSets');
        var dataPointsStore;

        var currentCountry;
        var currentRegion;

        var settingsRecords = [];
        var dataPointsRecords = [];

        settingsStore.load({ callback: loadDataSetsStore, scope: this });

        function loadDataSetsStore(records, operations, success) {
            settingsRecords = records;
            currentCountry = records[0].get('countryCode');
            this.currentCountry = currentCountry;
            currentRegion = records[0].get('region');
            dataSetsStore.load({ callback: loadDataPointsStore, scope: this });
        }

        function loadDataPointsStore(records, operation, success) {
            var myDataSet = this.getSummaryViewMortality().getDataSet();
            var myDataSetRecord = dataSetsStore.findRecord('id', myDataSet).getData();
            this.dataSetRecord = myDataSetRecord;
            dataSetsRecords = records;
            dataPointsStore = moneyworld.utils.Functions.getServerStore(
                myDataSet,
                "2010",
                "all"
                // currentCountry);
                );
            dataPointsStore.load({ callback: setData, scope: this });
        }

        function setData(records, operation, success) {
            this.sample2 = moneyworld.utils.Functions.storeToJson(records);
            // Visualisation code starts here
            dataPointsStore.sort([{ property: 'year', direction: 'ASC'}]);
            dataPointsStore.filter([
                // Ext.create('Ext.util.Filter', { property: 'countryCode', value: currentCountry }),
                Ext.create('Ext.util.Filter', { property: 'dataSetCode', value: this.getSummaryViewMortality().getDataSet() })
            ]);
            
            // if ( dataPointsStore.last() ) {
            //     var currentMortality = dataPointsStore.last().get('value');
            //     if ( currentMortality == "" ) {
            //         var htmlString = moneyworld.utils.Functions.printErrorMessage();
            //         this.getSummaryViewMortality().setHtml(htmlString);
            //         return;
            //     }
            // } else {
            //     var htmlString = moneyworld.utils.Functions.printErrorMessage();
            //     this.getSummaryViewMortality().setHtml(htmlString);
            //     return;
            // }

            // currentMortality = parseInt(currentMortality * 100);

            // Visualisation code ends here
        }
    },
    drawMap: function() {
        var map = generateMap2('africa_en', this.sample2['2010'],this.dataSetRecord , 1);
        // $('#map1').vectorMap('set', 'focus', 'TN');
        map.setFocus(this.currentCountry);
        // $('#map1').vectorMap('set', 'colors', "MA", '#000000');
    }
});