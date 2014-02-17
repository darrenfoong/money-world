Ext.define('moneyworld.utils.Functions', {
	requires: [
		'Ext.data.proxy.JsonP'
	],
	singleton: true,

	getServerStore: function(dataSet, year, country) {
		var url = "http://money-world.appspot.com/api/" + dataSet + "/" + year + "/" + country;
		var dataPointsStore = Ext.create('Ext.data.Store', {
			model: 'moneyworld.model.DataPoint',
			proxy: {
				type: 'jsonp',
				url: url,
				reader: {
					type: 'json',
					rootProperty: 'datapoints'
				}
			}
		});
		return dataPointsStore;
	}
});
