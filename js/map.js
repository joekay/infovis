function map(){

    var zoom = d3.behavior.zoom()
        .on("zoom", move);
        

    var mapDiv = $("#map");

    //svgrutan
    var margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = mapDiv.width(),
        height = mapDiv.height();
    //initialize color scale
    //...
    
    //initialize tooltip
    //...

    var projection = d3.geo.mercator()
        .center([10, 45]);

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);

    g = svg.append("g");

    // load data and draw the map
    d3.json("data/swe_mun.topojson", function(error, sweden) {
        
        var mun = topojson.feature(sweden, sweden.objects.swe_mun).features;
        
        //load summary data
        //...
        console.log("hej")
        draw(mun);
        
    });

    function draw(swe,data)
    {
        var country = g.selectAll(".country").data(swe);
        //initialize a color country object	
        var cc = {};
		
        //...

        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            //country color
            //...
            //tooltip
            .on("mousemove", function(d) {
                //...
            })
            .on("mouseout",  function(d) {
                //...
            })
            //selection
            .on("click",  function(d) {
                //...
            });

    }
    
    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;
        

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }
}

