Ext.define('moneyworld.store.DataSets', {
	extend: 'Ext.data.Store',
	requires: [
		'moneyworld.model.DataSet'
	],
	config: {
		model: 'moneyworld.model.DataSet',
		autoLoad: false,

		proxy: {
			type: 'ajax',
			url: 'data/datasets.json',

			reader: {
				type: 'json',
				rootProperty: 'datasets'
			}
		}
	}
});
