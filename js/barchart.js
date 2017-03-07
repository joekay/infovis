function barchart(){

    var self = this; // for internal d3 functions

    var barchartDiv = $("#barchart");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = barchartDiv.width(),
        height = barchartDiv.height() / 2;


    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var parties = ["aa","aa","aa","aa","aa","aa","aa"]; 

    //Load data
    this.yolo = function(data) {

        var dataa = [];
        console.log(data);

        for(var i = 0; i < 8; i++){

        data.results[i] = parseFloat(data.results[i]);
        }
        console.log(data);

        self.data = dataa;

        x.domain(d3.extent(self.data, function(d) { return x(parties); }));
        y.domain([0,60]);

        draw();

    };

    function draw()
    {
        // Add x axis and title.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6);
            
        // Add y axis and title.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em");

        svg.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .style("fill","blue")
            .attr("x", function(d) { return x(parties); })
            .attr("y", function(d) { return y(d.results); })
            .attr("width", 1)
            .attr("height", function(d) { return d.data; });

    }


}



