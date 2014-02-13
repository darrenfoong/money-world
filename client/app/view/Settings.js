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
						name: 'country',
						xtype: 'selectfield',
						label: 'Country',

						options: [
							{
								text: 'Rwanda',
								value: 'RW'
							},
							{
								text: 'Burundi',
								value: 'BI'
							}
						]
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
