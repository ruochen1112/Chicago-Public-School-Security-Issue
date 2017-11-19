


var margin = {top: 30, right: 20, bottom: 50, left: 30}
var width = 1000;
var height = 400;



 d3.json("data.json", function(error,data) {
        dataset = data;
    

    creatmap();

   

});

  d3.json("gang.json", function(error,data) {
        gang = data;
          creatbar();
});



function creatmap() {


    var map = L.map('map').setView([41.88, -87.63], 12);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);

        map._initPathRoot()    

    var svg = d3.select("#map")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

    var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");

    var points = selectAll("circle")
        .data(dataset.Location)
        .enter().append("svg:circle")
        .attr("r", 10)
        .attr("cx", function(d){return map(d.geometry.coordinates)[0];})
        .attr("cy", function(d){return map(d.geometry.coordinates)[1];})






    };




                    



function creatbar() {

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");

};



                    


