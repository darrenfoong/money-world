Ext.define('moneyworld.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			overView: 'overview',

			btnSettings: 'main button[action=settings]',
			btnCountryMode: 'main button[action=countrymode]',
			btnRegionMode: 'main button[action=regionmode]'
		},
		control: {
			'mainView': {
				activeitemchange: 'printStack',
			},
			'btnSettings': {
				tap: 'onSettingsBtnTap'
			},
			'btnCountryMode': {
				tap: 'onCountryModeBtnTap'
			},
			'btnRegionMode': {
				tap: 'onRegionModeBtnTap'
			}
		},
		stores: [
			'moneyworld.store.Settings'
		]
	},

	printStack: function() {
		console.log("Navigation view changed: stack is [" + this.getMainView().getNavigationBar().backButtonStack + "]");
	},

	onSettingsBtnTap: function() {
		console.log("Settings button tapped");
		if ( !this.getMainView().getActiveItem().isXType("settings") ) {
			console.log("Pushing Settings to Main");
			var settingsView = Ext.create('moneyworld.view.Settings');
			this.getMainView().push(settingsView);
		} else {
			console.log("View unchanged");
		}
	},

	onCountryModeBtnTap: function() {
		console.log("Country mode button tapped");
		if ( !this.getMainView().getActiveItem().isXType("overview") ) {
			console.log("Resetting Main");
			this.getMainView().reset();
		} else {
			console.log("View unchanged");
		}
	},

	onRegionModeBtnTap: function() {
		console.log("Region mode button tapped");
		if ( !this.getMainView().getActiveItem().isXType("mapview") ) {
			var currentSummaryView = this.getOverView().getActiveItem();
			var currentDataSet = currentSummaryView.getDataSet();

			var mapView = Ext.create('moneyworld.view.MapView');
			mapView.setDataSet(currentDataSet);
			
			Ext.ComponentQuery.query('geomapview')[0].setHtml('<iframe style="position: absolute; width: 100%; height: 100%;" src="app/viz/map_view?' + currentDataSet + '"/>');
			console.log("Pushing MapView[" + currentDataSet + "] to Main");
			this.getMainView().push(mapView);
		} else {
			console.log("View unchanged");
		}
	}
});
