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

				instructions: "Instructions here."
			}
		]
	}
});
