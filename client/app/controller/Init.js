Ext.define('moneyworld.controller.Init', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
		},
		control: {
		}
	},

	launch: function(app) {
		console.log("Init");
		var record = Ext.getStore('Settings').getAt(0);
		if ( record != null ) {
			Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
			Ext.Viewport.add(Ext.create('moneyworld.view.Main'));
		}
	}
});
