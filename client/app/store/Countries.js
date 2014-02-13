Ext.define('moneyworld.store.Countries', {
	extend: 'Ext.data.Store',
	requires: [
		'moneyworld.model.Setting'
	],
	config: {
		model: 'moneyworld.model.Country',
		autoLoad: true,

		data: [
			{ name: 'Rwanda', code2: 'RW', code3: 'RWA', region: 'Southern Africa' },
			{ name: 'Burundi', code2: 'BI', code3: 'BDI', region: 'Southern Africa' }
		]
	}
});
