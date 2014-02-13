Ext.define('moneyworld.model.Country', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	config: {
		idProperty: 'countryId',
		identifier: 'uuid',

		fields: [
			{ name: 'name', type: 'auto' },
			{ name: 'code2', type: 'auto' },
			{ name: 'code3', type: 'auto' },
			{ name: 'region', type: 'auto' }
		]
	}
});
