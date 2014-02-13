Ext.define('moneyworld.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',

			btnSettings: 'main button[action=settings]',
			btnDetailedView: 'main button[action=detailedview]',
			btnComparisonView: 'main button[action=comparisonview]',
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
			'btnDetailedView': {
				tap: 'onDetailedViewBtnTap'
			},
			'btnComparisonView': {
				tap: 'onComparisonViewBtnTap'
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
		console.log("Navigation stack: " + this.getMainView().getNavigationBar().backButtonStack);
	},

	onSettingsBtnTap: function() {
		if ( !this.getMainView().getActiveItem().isXType("settings") ) {
			var settingsView = Ext.create('moneyworld.view.Settings');
			this.getMainView().push(settingsView);
		}
	},

	onDetailedViewBtnTap: function() {
		if ( !this.getMainView().getActiveItem().isXType("detailedview") ) {
			var detailedView = Ext.create('moneyworld.view.DetailedView');
			this.getMainView().push(detailedView);
		}
	},

	onComparisonViewBtnTap: function() {
		var comparisonView = Ext.create('moneyworld.view.ComparisonView');
		this.getMainView().push(comparisonView);
	},

	onCountryModeBtnTap: function() {
		if ( !this.getMainView().getActiveItem().isXType("overview") ) {
			this.getMainView().reset();
		}
	},

	onRegionModeBtnTap: function() {
		if ( !this.getMainView().getActiveItem().isXType("mapview") ) {
			var mapView = Ext.create('moneyworld.view.MapView');
			this.getMainView().push(mapView);
		}
	}
});
