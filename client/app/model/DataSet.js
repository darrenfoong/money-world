Ext.define('moneyworld.model.DataSet', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.identifier.Uuid'
	],
	config: {
		idProperty: 'dataSetId',
		identifier: 'uuid',

		fields: [
			{ name: 'name', type: 'auto' },
			{ name: 'id', type: 'auto' },
			{ name: 'description', type: 'auto' },
			{ name: 'precision', type: 'int' },
			{ name: 'prefix', type: 'auto' },
			{ name: 'suffix', type: 'auto' }
		]
	}
});
