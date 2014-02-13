Ext.define('moneyworld.controller.Settings', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			settingsView: 'settings',

			btnSubmit: 'settings button[action=submit]'
		},
		control: {
			'btnSubmit': {
				tap: 'onSubmit'
			},
			'settings': {
				activate: 'loadSettings'
			}
		}
	},

	onSubmit: function() {
		var settingsStore = Ext.getStore('Settings');
		settingsStore.removeAll();
		settingsStore.sync();

		var model = Ext.create('moneyworld.model.Setting', {});
		this.getSettingsView().updateRecord(model);

		var errors = model.validate();
		var errorString = "";

		if ( errors.isValid() ) {
			settingsStore.add(model.getData());
			settingsStore.sync();

			if ( this.getMainView() == null ) {
				console.log("Going through");
				Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
				Ext.Viewport.add(Ext.create('moneyworld.view.Main'));
			} else {
				this.getMainView().reset();
			}
		} else {
			errors.each(function(errorObj) {
				errorString += errorObj.getMessage() + "<br />";
			});

			Ext.Msg.alert("Oops!", errorString);
		}
	},

	loadSettings: function() {
		var settingsStore = Ext.getStore('Settings');
		if ( settingsStore.getCount() > 0 ) {
			this.getSettingsView().setRecord(settingsStore.getAt(0));
		}
	}
});
