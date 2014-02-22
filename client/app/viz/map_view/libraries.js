    function generateMap(map_id, dataset) {
        //recreate another map
        if (typeof dataset == "undefined") dataset = sample2[2000];
        console.log(dataset);
        jQuery('.jvectormap-container').remove();
        jQuery('#map1').vectorMap({
            map: map_id,
            focusOn: {
                x: 0,
                y: 1,
                scale: 1
            },
            series: {
                regions: [{
                    // scale: ['#C8EEFF', '#0071A4'],
                    scale: ['#FF0033', '#FF9900', '#33FF00'], //red amber green
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
                    fill: '#333333',
                    "fill-opacity": 0.8
                },
                selected: {
                    fill: 'yellow'
                },
                selectedHover: {}
            },
            onRegionLabelShow: function(e, l, c) {
                if (dataset[c] == undefined) {
                    $('#country-population-value').html("");
                    return
                }
                l.html("<img src='country_flag_png/" + c + ".png' alt='" + c + "' width='18' height='12'> " + l.html() + " GDP = " + dataset[c]);
                // $('#country-population-value').empty();
                $('#country-population-value').html(lazyround(population_2000_all[c]));
            }
        });

        //update global var
        current_map_id = map_id;
        map = $('#map1').vectorMap('get', 'mapObject');
    }

    var lazyround = function(num) {
        if (num.toString().indexOf(',') > 0) {
            var parts = num.split(",");
            return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length - 1)) + " " + ["thousand", "million", "billion"][parts.length - 2]) : parts[0];
        } else {
            num = num.toString();
            var parts = [];
            var counter = 0;
            // console.log(num.length);
            while (num.length > 3) {
                parts[counter++] = (num.substr(0, 3));
                num = num.substr(3);
            }
            parts[counter] = num;
            return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length - 1)) + " " + ["thousand", "million", "billion"][parts.length - 2]) : parts[0];

        }
    };