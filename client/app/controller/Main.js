Ext.define('moneyworld.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			overView: 'overview',

			btnMapView: 'main button[action=mapview]',
			btnInfoView: 'main button[action=infoview]',
			btnSettings: 'main button[action=settings]'
		},
		control: {
			'mainView': {
				activeitemchange: 'reloadNavigation'
			},
			'btnMapView': {
				tap: 'onMapViewBtnTap'
			},
			'btnInfoView': {
				tap: 'onInfoViewBtnTap'
			},
			'btnSettings': {
				tap: 'onSettingsBtnTap'
			}
		},
		stores: [
			'moneyworld.store.Settings'
		]
	},

	reloadNavigation: function(scope, newItem, oldItem, options) {
		console.log("Navigation view changed: stack is [" + this.getMainView().getNavigationBar().backButtonStack + "]");

		if ( newItem.isXType("overview") ) {
			this.getBtnMapView().show();
			this.getBtnInfoView().show();
			this.getBtnSettings().show();
		} else if ( newItem.isXType("mapview") ) {
			this.getBtnMapView().hide();
			this.getBtnInfoView().show();
			this.getBtnSettings().show();
		} else if ( newItem.isXType("infoview") ) {
			this.getBtnMapView().hide();
			this.getBtnInfoView().hide();
			this.getBtnSettings().show();
		} else if ( newItem.isXType("settings") ) {
			this.getBtnMapView().hide();
			this.getBtnInfoView().hide();
			this.getBtnSettings().hide();
		} 
	},

	onSettingsBtnTap: function() {
		console.log("Settings button tapped");

		console.log("Pushing Settings to Main");
		var settingsView = Ext.create('moneyworld.view.Settings');
		this.getMainView().push(settingsView);
	},

	onInfoViewBtnTap: function() {
		console.log("InfoView button tapped");

		var currentSummaryView = this.getOverView().getActiveItem();
		var currentDataSet = currentSummaryView.getDataSet();

		var infoView = Ext.create('moneyworld.view.InfoView');
		infoView.setDataSet(currentDataSet);

		console.log("Pushing InfoView[" + currentDataSet + "] to Main");
		this.getMainView().push(infoView);
	},

	onMapViewBtnTap: function() {
		console.log("MapView button tapped");

		var currentSummaryView = this.getOverView().getActiveItem();
		var currentDataSet = currentSummaryView.getDataSet();

		var mapView = Ext.create('moneyworld.view.MapView');
		mapView.setDataSet(currentDataSet);
		
		Ext.ComponentQuery.query('geomapview')[0].setHtml('<iframe style="position: absolute; width: 100%; height: 100%;" src="app/viz/map_view?' + currentDataSet + '"/>');
		console.log("Pushing MapView[" + currentDataSet + "] to Main");
		this.getMainView().push(mapView);
	}
});
