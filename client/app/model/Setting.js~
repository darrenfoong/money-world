Ext.define('moneyworld.model.Setting', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	config: {
		idProperty: 'settingId',
		identifier: 'uuid',

		fields: [
			{ name: 'username', type: 'auto' },
			{ name: 'country', type: 'auto' }
		],

		validations: [
			{
				type: 'presence',
				field: 'username',
				message: "Please provide a username."
			}
		],

		proxy: {
			type: 'localstorage',
			id: 'settings'
		}
	}
});
