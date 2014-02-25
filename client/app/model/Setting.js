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
			{ name: 'countryCode', type: 'auto' },
			{ name: 'countryName', type: 'auto' },
			{ name: 'region', type: 'auto' }
		],

		proxy: {
			type: 'localstorage',
			id: 'settings'
		}
	}
});
