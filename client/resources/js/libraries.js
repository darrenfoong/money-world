var map;
var current_map_id;

function generateMap(map_id, dataset, dataSetRecords, direction) {
    //recreate another map
    if (direction) {
        // now we want lower value to mean green
        var colourScale = ['#33FF00', '#FF9900', '#FF0033']; //green amber red

    } else {
        var colourScale = ['#FF0033', '#FF9900', '#33FF00']; //red amber green
    }

    if (typeof dataset == "undefined") {
        console.log ("data not loaded");
    }
    jQuery('.jvectormap-container').remove();
    jQuery('#map1').vectorMap({
        map: map_id,
        focusOn: {
            x: 0,
            y: 1,
            scale: 1
        },
        regionsSelectable: true,
        regionsSelectableOne: true,
        series: {
            regions: [{
                // scale: ['#C8EEFF', '#0071A4'],
                scale: colourScale,
                normalizeFunction: 'linear',
                values: dataset
            }]
        },
        regionStyle: {
            initial: {
                fill: 'white',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": 0.8
            },
            selected: {
                fill: '',
                "fill-opacity": 0.1,
                stroke: '#505050',
                "stroke-width": 3,
                "stroke-opacity": 1,
            },
            selectedHover: {
                fill: '#333333',
                "fill-opacity": 0.8
            }
        },
        onRegionLabelShow: function(e, l, c) {
            if (dataset[c] == undefined) {
                $('#country-population-value').html("");
                return
            }
            $('#country-population-value').html(lazyround(population_2000_all[c]));
            // $('#country-population-value').empty();
            // create fallback
            if (dataSetRecords == undefined || dataSetRecords == "{}") {
                l.html("<img src='country_flag_png/" + c + ".png' alt='" + c + "' width='18' height='12'> " + l.html() + dataset[c]);
                var valuePrinted = dataset[c];
                $('#value-box').html(valuePrinted);
            } else {
                // display the prettified value
                var valuePrinted = prettify(dataset[c], dataSetRecords['precision'], dataSetRecords['prefix'], dataSetRecords['suffix']);
                l.html("<img src='country_flag_png/" + c + ".png' alt='" + c + "' width='18' height='12'> " + l.html() + " " + valuePrinted);
                $('#value-box').html(dataSetRecords['name'] + ' is ' + valuePrinted);
            }
        }
    });

    //update global var
    current_map_id = map_id;
    return $('#map1').vectorMap('get', 'mapObject');
    // map = $('#map1').vectorMap('get', 'mapObject');
}

function generateMap2(map_id, dataset, dataSetRecords, direction) {
    //recreate another map
    if (direction) {
        // now we want lower value to mean green
        var colourScale = ['#33FF00', '#FF9900', '#FF0033']; //green amber red

    } else {
        var colourScale = ['#FF0033', '#FF9900', '#33FF00']; //red amber green
    }

    if (typeof dataset == "undefined") {
        console.log ("data not loaded");
    }
    jQuery('.jvectormap-container').remove();
    jQuery('#map2').vectorMap({
        map: map_id,
        focusOn: {
            x: 0,
            y: 1,
            scale: 1
        },
        regionsSelectable: true,
        regionsSelectableOne: true,
        series: {
            regions: [{
                // scale: ['#C8EEFF', '#0071A4'],
                scale: colourScale,
                normalizeFunction: 'linear',
                values: dataset
            }]
        },
        regionStyle: {
            initial: {
                fill: 'white',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": 0.8
            },
            selected: {
                fill: '',
                "fill-opacity": 0.1,
                stroke: '#505050',
                "stroke-width": 3,
                "stroke-opacity": 1,
            },
            selectedHover: {
                fill: '#333333',
                "fill-opacity": 0.8
            }
        },
        onRegionLabelShow: function(e, l, c) {
            if (dataset[c] == undefined) {
                $('#country-population-value').html("");
                return
            }
            $('#country-population-value').html(lazyround(population_2000_all[c]));
            // $('#country-population-value').empty();
            // create fallback
            if (dataSetRecords == undefined || dataSetRecords == "{}") {
                l.html("<img src='country_flag_png/" + c + ".png' alt='" + c + "' width='18' height='12'> " + l.html() + dataset[c]);
                var valuePrinted = dataset[c];
                $('#value-box').html(valuePrinted);
            } else {
                // display the prettified value
                var valuePrinted = prettify(dataset[c], dataSetRecords['precision'], dataSetRecords['prefix'], dataSetRecords['suffix']);
                l.html("<img src='country_flag_png/" + c + ".png' alt='" + c + "' width='18' height='12'> " + l.html() + " " + valuePrinted);
                $('#value-box').html(dataSetRecords['name'] + ' is ' + valuePrinted);
            }
        }
    });

    //update global var
    current_map_id = map_id;
    return $('#map2').vectorMap('get', 'mapObject');
}


function prettify(value, precision, prefix, suffix) {
    var output = prefix;
    var counter = 0;

    var units = ['', 'thousand', 'million', 'billion'];

    var pvalue = parseFloat(value);

    while (pvalue >= 1000 && counter < 3) {
        counter++;
        pvalue /= 1000;
    }

    pvalue = Number(pvalue).toFixed(precision);

    output += pvalue + units[counter] + suffix;

    return output;
}

var lazyround = function(num) {
    if (num.toString().indexOf(',') > 0) {
        var parts = num.split(",");
        return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length - 1)) + " " + ["thousand", "million", "billion"][parts.length - 2]) : parts[0];
    } else {
        num = num.toString();
        var parts = [];
        var counter = 0;
        while (num.length > 3) {
            parts[counter++] = (num.substr(0, 3));
            num = num.substr(3);
        }
        parts[counter] = num;
        return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length - 1)) + " " + ["thousand", "million", "billion"][parts.length - 2]) : parts[0];

    }
};


// update map object

function updateMap() {
    if (empty($('#map1'))) {
    map = $('#map2').vectorMap('get', 'mapObject');
    }
    else{
    map = $('#map1').vectorMap('get', 'mapObject');
    }
}

// Making key

function makekey() {
    var key = $("#key");
    updateMap();
    key.toggleClass("invisible");
    key.empty();
    var localMin = map.series.regions[0].scale.clearMinValue;
    var localMax = map.series.regions[0].scale.clearMaxValue;
    var steps = 4;
    for (var i = 0; i <= steps; i++) {
        var jumps = (localMax - localMin) / steps;
        var val = localMin + jumps * i;
        var color = map.series.regions[0].scale.getValue(val);
        if (i == 0) {
            key.append('<div style="background-color:' + color + ';"> < ' + val.toFixed(2) + '</div>');
        } else if (i == steps) {
            key.append('<div style="background-color:' + color + ';"> > ' + val.toFixed(2) + '</div>');
        } else {
            key.append('<div style="background-color:' + color + ';">' + val.toFixed(2) + ' - ' + (val + jumps).toFixed(2) + '</div>');
        }
    }
}
