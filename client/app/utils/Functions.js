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
		// Input: a floating point number between 0 and 1
		// Output: an object with numerator and denominator fields
		var denominator = 100;
		var numerator = Math.ceil(value * denominator);
		
		function gcd(a, b) {
			if ( b == 0 ) {
				return a;
			} else {
				return gcd(b, a % b);
			}
		}

		var factor = gcd(numerator, denominator);
		return { numerator: numerator/factor, denominator: denominator/factor }
	},

	floatToGrid: function(value) {
		// Input: a floating point number between 0 and 1
		// Output: an object with numerator, denominator, width of grid, and height of grid fields
		// Algorithm tries to create a grid that is as square as possible.
		// TODO Improve to include factorisation of arbitrary denominator; pair of factors with the smallest difference is the solution
		var ratio = moneyworld.utils.Functions.floatToRatio(value);
		var numerator = ratio.numerator;
		var denominator = ratio.denominator;

		var i = 0;
		var primes = [2,3,5,7,9];

		var width = 1;

		while ( width < denominator ) {
			if ( denominator % primes[i] == 0 ) {
				denominator /= primes[i];
				width *= primes[i];
			} else {
				i++;
			}
		}

		var height = denominator;

		ratio.width = width;
		ratio.height = height;
		return ratio;
	}
});
