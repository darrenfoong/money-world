Ext.define('moneyworld.controller.MainTileView', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			mainView: 'main',
			mainTileView: 'maintileview',
		},
		control: {
			'mainTileView': {
				initialize: 'loadData',
				itemtap: 'onMainTileItemTap'
			}
		}
	},

	onMainTileItemTap: function(view, index, target, record, event) {
		var dataSetsStore = Ext.getStore('DataSets');
		dataSetsStore.load({ callback: redirect, scope: this });

		function redirect(records, operations, success) {
			var detailedView = Ext.create('moneyworld.view.DetailedView');
			var currentDataSet = dataSetsStore.findRecord('id', record.get('dataSetCode'));
			detailedView.setTitle(currentDataSet.get('name'));
			// Ext.ComponentQuery.query('list', detailedView).getStore().add(currentDataSet);
			// Ext.ComponentQuery.query('list', detailedView).ss = 1;
			this.getMainView().push(detailedView);
		}
	},

	loadData: function() {
		/*		
		console.log("Loading MainTileView");
		var dataSetsStore = Ext.getStore('DataSets');
		dataSetsStore.load({ callback: setData, scope: this });

		console.log("MainTileView: " + this.getMainTileView());
		console.log("MainTileViewStore: " + this.getMainTileView().getStore());

		function setData(records, operation, success) {
			Ext.Array.each(records, function(record) {
				console.log(record.get('name'));
				this.getMainTileView().getStore().add(record);
			}, this);
		}*/

		console.log("Loading MainTileView");
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore = Ext.create('Ext.data.Store', {
			model: 'moneyworld.model.DataPoint',
			proxy: {
				type: 'ajax',
				url: 'data/datapoints.json',
				reader: {
					type: 'json',
					rootProperty: 'datapoints'
				}
			}
		});

		dataSetsRecords = [];
		dataPointsRecords = [];
		dataSetsStore.load({ callback: loadDataPointsStore, scope: this });

		function loadDataPointsStore(records, operation, success) {
			dataSetsRecords = records;
			dataPointsStore.load({ callback: loadSettings, scope: this });
		}

		function loadSettings(records, operation, success) {
			dataPointsRecords = records;
			settingsStore.load({ callback: setData, scope: this });
		}

		function setData(records, operation, success) {
			var currentCountry = records[0].get('countryCode');
			var currentRegion = records[0].get('region');
			Ext.Array.each(dataPointsRecords, function(record) {
				if ( record.get('countryCode') == currentCountry ) {
					var currentDataSet = dataSetsStore.findRecord('id', record.get('dataSetCode'));

					if ( record.get('value') == "" ) {
						record.set('value', "Data not available");
						record.set('prefix', "");
						record.set('suffix', "");
					} else {
						record.set('prefix', currentDataSet.get('prefix'));
						record.set('suffix', currentDataSet.get('suffix'));

						var precision = parseInt(currentDataSet.get('precision'));
						if ( precision > 0 ) {
							console.log(record.get('value'));
							record.set('value', new Number(record.get('value')).toPrecision(precision));
						}
						if ( precision < 0 ) {
							console.log("Before " + record.get('value'));
							console.log(Math.pow(10,precision));
							record.set('value', parseInt(parseInt(record.get('value'))*Math.pow(10, precision)));
							console.log("After " + record.get('value'));
						}
					}

					record.set('dataSetName', currentDataSet.get('name'));
					this.getMainTileView().getStore().add(record);
				} 
			}, this);
			this.getMainTileView().setItemTpl('{dataSetName}: {prefix}{value}{suffix}');
		}
	}
});
