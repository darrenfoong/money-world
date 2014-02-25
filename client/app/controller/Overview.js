Ext.define('moneyworld.controller.Overview', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			overView: 'overview'
		},
		control: {
			'overView': {
				initialize: function() {
					this.getOverView().element.on({
						tap: this.getApplication().getController('moneyworld.controller.Overview').loadDetailedView
					});
				},
				show: 'loadTitle'
			}
		}
	},

	loadTitle: function() {
		console.log("Loading Overview");
		var settingsStore = Ext.getStore('Settings');
		settingsStore.load({ callback: setTitle, scope: this });

		function setTitle(records, operation, success) {
			var countryName = records[0].get('countryName');

			var innerItems = this.getMainView().getInnerItems();
			for ( var i = 0; i < innerItems.length; i++ ) {
				if ( innerItems[i] === this.getOverView() ) {
					break;
				}
			}

			this.getOverView().setTitle(countryName);
			this.getMainView().getNavigationBar().backButtonStack[i] = countryName;
			this.getMainView().getNavigationBar().setTitle(countryName);
			console.log("Setting Main title to " + countryName);
		}
	},

	loadDetailedView: function() {
		console.log("SummaryView tapped");
		var dataSetsStore = Ext.getStore('DataSets');
		dataSetsStore.load({ callback: redirect, scope: this });

		function redirect(records, operations, success) {
			var currentSummaryView = Ext.ComponentQuery.query('overview')[0].getActiveItem();
			var currentDataSetInternal = currentSummaryView.getDataSetInternal();
			console.log(dataSetsStore.findRecord('id', currentSummaryView.getDataSet()));
			var currentDataSet = dataSetsStore.findRecord('id', currentSummaryView.getDataSet()).get('name');

			var detailedView = Ext.create('moneyworld.view.DetailedView' + currentDataSetInternal);
			detailedView.setTitle(currentDataSet);
			detailedView.setDataSet(currentSummaryView.getDataSet());
			console.log("Pushing DetailedView" + currentDataSetInternal + "[" + currentDataSet + "] to Main");
			// this.getMainView() not used because it is out of scope
			Ext.ComponentQuery.query('main')[0].push(detailedView);
		}
	}
});
