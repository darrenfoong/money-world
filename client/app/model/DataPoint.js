Ext.define('moneyworld.model.DataPoint', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	config: {
		idProperty: 'dataSetId',
		identifier: 'uuid',

		fields: [
			{ name: 'dataSetCode', type: 'auto' },
			{ name: 'countryCode', type: 'auto' },
			{ name: 'year', type: 'auto' },
			{ name: 'value', type: 'auto' }
		]
	}
});
