function map(){

    var mapDiv = $("#map");

    //svgrutan
    var width = mapDiv.width(),
    height = mapDiv.height();

    var zoom = d3.behavior.zoom()

    .on("zoom", move);

    //var c20 = d3.scale.category20();
    // var color = d3.scaleThreshold()
    //     .domain([1,10])
    //     .range(d3.schemeBlues[9]);
    
    // check
    var projection = d3.geo.mercator()
    .scale(1300)
    .center([26,65]);


    // check
    var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);


    // check
    var path = d3.geo.path()
    .projection(projection);

    g = svg.append("g");

    var regionNames = [];

    // load data and draw the map
    d3.json("data/swe_mun.topojson", function(error, sweden) {

        var mun = topojson.feature(sweden, sweden.objects.swe_mun).features;

        //mun.results = [1];

        // save all names from jsonmap
        for(var i = 0; i < mun.length; i++){
            regionNames[i] = mun[i].properties.name;
            //console.log(regionNames[i]);
        };

        d3.csv("data/Swedish_Election_2014.csv", function(data) {

            draw(mun,data);
        })
        
    });


    var count = 0;

    function draw(mun,data)
    {
        var country = g.selectAll(".country").data(mun);
        //initialize a color country object 
        var cc = {};
        var regionResult = [];
        var sortedResults = [];

        var slicedNames = [];



        for(var i = 0; i < data.length; i++){
            slicedNames[i] = data[i]["region"];
            slicedNames[i] = slicedNames[i].slice(5);
        }
        var counter = 0;

        var resultat = [];

        for(var i = 0; i < regionNames.length; i++){

            for(var j = 0; j < data.length; j++){

                if(regionNames[i] == slicedNames[j] && counter < 9){

                    resultat[counter] = data[j]["Year=2014"];
                    counter++;
                    //console.log(regionNames[i] + " " + resultat);
                    //Array.prototype.push.apply(mun[i].properties.result, resultat);
                    //mun[i].results = resultat;

                }
                else{
                     mun[i].results = resultat;
                     //console.log(mun[i].results.length);
                }

                // if(resultat.length = 0 && counter = 8){
                //     console.log(hej);
                // }
        
            }     
            //console.log(resultat.length);

            counter = 0;
            resultat = [];
                                
        }

    // decide color for each region depending on political stance
    for (var i = 0; i < mun.length; i++){

        var local = mun[i].results;
        var constant = 0;

        var blue = parseFloat(local[0]) + parseFloat(local[1]) 
        + parseFloat(local[2])+ parseFloat(local[3]);

        var red = parseFloat(local[4]) + parseFloat(local[5]) + parseFloat(local[6]);
        //console.log(blue + "  " + red + "  " + local);

        if(red > blue){

            constant = 0.5 - 0.5*(red/100);

        }
        else{
            constant = 0.5 + 0.5*(red/100);
        } 

        mun[i].color = d3.interpolateRdBu(constant);

    }

        country.enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("id", function(d) { return d.id; })
        .attr("title", function(d) { return d.properties.name; })
            //country color
            .style("fill", function(d) { return d.color; })
            
            //tooltip
            .on("mousemove", function(d) {
                //...
            })
            .on("mouseout",  function(d) {
                //...
            })
            //selection
            .on("click",  function(d) {
                console.log(d);
            });

        }

    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;
        

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }


}

