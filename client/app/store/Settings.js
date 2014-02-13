Ext.define('moneyworld.store.Settings', {
	extend: 'Ext.data.Store',
	requires: [
		'moneyworld.model.Setting'
	],
	config: {
		model: 'moneyworld.model.Setting',
		autoLoad: true
	}
});
