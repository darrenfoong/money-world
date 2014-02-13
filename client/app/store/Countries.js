Ext.define('moneyworld.store.Countries', {
	extend: 'Ext.data.Store',
	requires: [
		'moneyworld.model.Country'
	],
	config: {
		model: 'moneyworld.model.Country',
		autoLoad: false,

		proxy: {
			type: 'ajax',
			url: 'data/countries.json',

			reader: {
				type: 'json',
				rootProperty: 'countries'
			}
		}
	}
});
