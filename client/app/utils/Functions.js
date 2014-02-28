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
	
	getRegionForCountry: function(countriesStore,code2) {
		var region = '';
		
		countriesStore.filter([Ext.create('Ext.util.Filter', {
			filterFn: function(country) {
				if (country.get('code2') == code2) {
					region = country.get('region');
				} 
				return true;
			}
		})]);
		return region;
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
	
	getRangedColour: function(pct) {
		var percentColors = [
		    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
		    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
		    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

	    for (var i = 1; i < percentColors.length - 1; i++) {
	        if (pct < percentColors[i].pct) {
	            break;
	        }
	    }
	    var lower = percentColors[i - 1];
	    var upper = percentColors[i];
	    var range = upper.pct - lower.pct;
	    var rangePct = (pct - lower.pct) / range;
	    var pctLower = 1 - rangePct;
	    var pctUpper = rangePct;
	    var color = {
	        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
	        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
	        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
	    };
		
		var rgbPercentage = "#" + ((color.r.toString(16) < 16) ? "0" : "") + color.r.toString(16) 
			+ ((color.g.toString(16) < 16) ? "0" : "") + color.g.toString(16) 
			+ ((color.b.toString(16) < 16) ? "0" : "") + color.b.toString(16);
		console.log(rgbPercentage);
	    return rgbPercentage;
	    
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

	floatToRatio: function(value, denominator) {
		// Input: a floating point number between 0 and 1
		// Output: an object with numerator and denominator fields
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

	findClosestFactors: function(value) {
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
	},

	floatToGrid: function(value, factor) {
		// Input: a floating point number between 0 and 1
		// Output: an object with numerator, denominator, width of grid, and height of grid fields
		// Algorithm tries to create a grid that is as square as possible.
		var ratio = moneyworld.utils.Functions.floatToRatio(value, factor);
		var numerator = ratio.numerator;
		var denominator = ratio.denominator;

		var factors = moneyworld.utils.Functions.findClosestFactors(denominator);

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
	},

	storeDataSetToJson: function (recordsArray, id) {
		// this is for formatting into jvectorMap format
		var finalResult = {};
		for (var i = recordsArray.length - 1; i >= 0; i--) {
			var tempObj = recordsArray[i].getData();
			if (tempObj['id'] == id) {
				return tempObj;
			}
		};
		return finalResult;
	}
});
