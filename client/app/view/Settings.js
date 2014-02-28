Ext.define('moneyworld.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype: 'settings',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Select'
	],
	config: {
		title: 'Settings',

		items: [
			{
				xtype: 'fieldset',

				items: [
					{
						name: 'username',
						xtype: 'textfield',
						label: 'Name'
					},
					{
						name: 'countryCode',
						xtype: 'selectfield',
						label: 'Country',
						itemID: 'countryCode'
					},
					{
						xtype: 'button',
						text: 'Submit',
						action: 'submit',
						ui: 'confirm'
					}
				],

				instructions: "Please choose your home country. <br/> 1. Swipe to see different indicators, and tap for more detail. <br/> 2. Tap on the globe icon to see the indicator on a map. <br/> 3. Tap the i button for an explanation of the indicator."
			}
		]
	}
});
