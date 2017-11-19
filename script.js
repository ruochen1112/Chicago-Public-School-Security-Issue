


var margin = {top: 30, right: 20, bottom: 50, left: 30}
var width = 1000;
var height = 400;



d3.json("data.json", function(error, data) {

    dataset = data;
    
});
    creatmap();







function creatmap() {

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");




                    
};


