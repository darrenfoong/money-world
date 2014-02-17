Ext.define('moneyworld.controller.Init', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
		},
		control: {
		}
	},

	launch: function(app) {
		console.log("Starting Init");
		var settingsStore = Ext.getStore('Settings');
		settingsStore.load({ callback: checkSettings });

		function checkSettings(records, operation, success) {
			var record = records[0];
			if ( record != null ) {
				// TODO
				// Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true) will, for some reason, fire the show event on mainView
				// Hence, there will be two show events fired for Overview and loadTitle() will execute twice
				// The following workaround creates a view but does not destroy the init view

				// Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
				// Ext.Viewport.getActiveItem().destroy();

				console.log("Init Breakpoint 1");
				var mainView = Ext.create('moneyworld.view.Main');
				console.log("Init Breakpoint 2");
				Ext.Viewport.setActiveItem(mainView);
				console.log("Loaded Main");
			}
		}
	}
});
