Ext.define('moneyworld.controller.Settings', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			settingsView: '#settings',

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
		// TODO
		var settingsViewArray = Ext.ComponentQuery.query('settings');
		var settingsView = settingsViewArray[settingsViewArray.length-1];
		// END

		console.log("Starting form submission");
		var settingsStore = Ext.getStore('Settings');
		var countriesStore = Ext.getStore('Countries');

		settingsStore.load({ callback: loadCountries, scope: this });

		function loadCountries(records, operation, success) {
			settingsStore.removeAll();
			settingsStore.sync();

			countriesStore.load({ callback: updateSettings, scope: this });
		}

		function updateSettings(records, operation, success) {
			var model = Ext.create('moneyworld.model.Setting', {});
			settingsView.updateRecord(model);

			var countryCode = model.get('countryCode');
			var countryName = countriesStore.findRecord('code2', countryCode).get('name');
			var regionName = countriesStore.findRecord('code2', countryCode).get('region');
			model.set('countryName', countryName);
			model.set('region', regionName);

			console.log('Final model data is ' + model.get('username') + ", " + model.get('countryName') + ", " + model.get('countryCode') + ", " + model.get('region'));

			var errors = model.validate();
			var errorString = "";

			console.log("Validation " +  errors.isValid());

			if ( errors.isValid() ) {
				settingsStore.add(model.getData());
				settingsStore.sync();

				if ( this.getMainView() == null ) {
					var mainView = Ext.create('moneyworld.view.Main');
					Ext.Viewport.setActiveItem(mainView);
					console.log("Loaded Main");
				} else {
					console.log("Settings saved");
					console.log("Resetting Main");

					Ext.Array.each(Ext.ComponentQuery.query('summaryview'), refreshSummaryView, this);

					function refreshSummaryView(summaryView) {
						// This is a very bad hack
						var xtypes = summaryView.getXTypes().split('/');
						var xtype = xtypes[xtypes.length-1].split('_')[1];
						xtype = xtype.charAt(0).toUpperCase() + xtype.slice(1);
						this.getApplication().getController('moneyworld.controller.SummaryView' + xtype).renderView();
						console.log("Refreshing SummaryView" + xtype);
					}

					this.getMainView().reset();
				}
			} else {
				errors.each(function(errorObj) {
					errorString += errorObj.getMessage() + "<br />";
				});

				Ext.Msg.alert("Oops!", errorString);
			}
		}
	},

	loadSettings: function() {
		// TODO
		var settingsViewArray = Ext.ComponentQuery.query('settings');
		var settingsView = settingsViewArray[settingsViewArray.length-1];
		// console.log("Length of settingsViewArray is " + settingsViewArray.length);
		// console.log("Settings load: " + settingsView.getItemId());
		// END

		var settingsStore = Ext.getStore('Settings');
		var countriesStore = Ext.getStore('Countries');
		// TODO
		// Closure problem
		settingsRecords = [];
		countriesRecords = [];
		//END
		settingsStore.load({ callback: loadCountries, scope: this });

		function loadCountries(records, operation, success) {
			settingsRecords = records;
			countriesStore.load({ callback: fillForm, scope: this });
		}

		function fillForm(records, operation, success) {
			countriesRecords = records;
			// TODO
			var countryCodeSelectField = Ext.ComponentQuery.query('selectfield')[Ext.ComponentQuery.query('selectfield').length-1];
			// END

			var optionsArray = [];

			Ext.Array.each(countriesRecords, fillOptions, this);

			function fillOptions(option) {
				optionsArray[optionsArray.length] = { text: option.get('name'), value: option.get('code2') };
			}

			countryCodeSelectField.setOptions(optionsArray);

			if ( settingsStore.getCount() > 0 ) {
				settingsView.setRecord(settingsRecords[0]);
				console.log("Settings for " + settingsRecords[0].get('username') + " loaded");
			}
		}
	}
});
