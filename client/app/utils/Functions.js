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
	},

	prettify: function(value, precision, prefix, suffix) {
		var output = prefix;
		var counter = 0;

		var units = ['', 'thousand', 'million', 'billion'];

		var pvalue = parseFloat(value);

		while ( pvalue >= 1000 && counter < 3 ) {
			counter++;
			pvalue /= 1000;
		}

		pvalue = Number(pvalue).toFixed(precision);

		output += pvalue + " " + units[counter] + " " + suffix;

		return output;
	},

	floatToRatio: function(value) {
		var denominator = 20;
		var numerator = parseInt(value * denominator);
		
		function gcd(a, b) {
			if ( b == 0 ) {
				return a;
			} else {
				return gcd(b, a % b);
			}
		}

		var factor = gcd(numerator, denominator);
		console.log(value + " becomes " + numerator/factor + "/" + denominator/factor);
		return { numerator: numerator/factor, denominator: denominator/factor }
	}
});
