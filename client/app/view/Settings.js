Ext.define('moneyworld.view.Settings', {
	extend: 'Ext.form.Panel',
	xtype: 'settings',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Select'
	],
	config: {
		title: 'Settings',

		layout: {
			type: 'vbox',
			pack: 'center'
		},

		items: [
			{
				xtype: 'fieldset',

				items: [
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

				instructions: "Please choose your home country<p>1. Swipe to see different indicators, and tap for more detail.</p><p>2. Tap on the globe icon to see the indicator on a map.<p>3. Tap the i button for an explanation of the indicator.</p>"
			}
		]
	}
});
