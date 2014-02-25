Ext.define('moneyworld.utils.Functions', {
	requires: [
		'Ext.data.proxy.JsonP'
	],
	singleton: true,

	changeTitle: function(actualView, navigationView, name) {
		var innerItems = navigationView.getInnerItems();
		for ( var i = 0; i < innerItems.length; i++ ) {
			if ( innerItems[i] === actualView ) {
				break;
			}
		}

		actualView.setTitle(name);
		navigationView.getNavigationBar().backButtonStack[i] = name;
		navigationView.getNavigationBar().setTitle(name);
	},

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

		output += pvalue + units[counter] + suffix;

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
		var ratio = moneyworld.utils.Functions.floatToRatio(value);
		var numerator = ratio.numerator;
		var denominator = ratio.denominator;

		function findClosestFactors(value) {
			var currentDelta = 0;
			var minDelta = value;
			var minFactor1 = 1;
			var minFactor2 = value;
			for ( var i = 1; i <= Math.sqrt(value); i++ ) {
				if ( value % i == 0 ) {
					currentDelta = value/i - i;
					if ( currentDelta < minDelta ) {
						minDelta = currentDelta;
						minFactor1 = i;
						minFactor2 = value/i;
					}
				}
			}

			return { factor1: minFactor1, factor2: minFactor2 };
		}

		var factors = findClosestFactors(denominator);

		ratio.width = factors.factor1;
		ratio.height = factors.factor2;
		return ratio;
	},

	storeToJson: function (recordsArray) {
		// this is for formatting into jvectorMap format
		var finalResult = {};
		for (var i = recordsArray.length - 1; i >= 0; i--) {
			var tempObj = recordsArray[i].getData();
			if (typeof finalResult[tempObj['year']] == 'undefined') {
				finalResult[tempObj['year']] = {}
			}
			finalResult[tempObj['year']][tempObj['countryCode']]=[tempObj['value']];
		};
		return finalResult;
	}
});
