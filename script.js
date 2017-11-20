


var margin = {top: 30, right: 20, bottom: 50, left: 30}
var width = 1000;
var height = 400;




   creatmap();


  d3.json("test_gang.json", function(error,data) {
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
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);


    var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");

    d3.json("test.json", function(collection) {
        collection.objects.forEach(function(d) {
            d.LatLng = new L.LatLng(d.circle.coordinates[0],
                                    d.circle.coordinates[1])
        })  
 

    var feature = g.selectAll("circle")
            .data(collection.objects)
            .enter().append("circle")
            .style("stroke", "#b0d8da")  
            .style("opacity", .6) 
            .style("fill", "#0a406e")
            .attr("r", 15);  
        
    map.on("viewreset", update);
        update();

    function update() {
        feature.attr("transform", 
        function(d) { 
            return "translate("+ 
                map.latLngToLayerPoint(d.LatLng).x +","+ 
                map.latLngToLayerPoint(d.LatLng).y +")";
                }
            )
        }          
});

//attempt of another marker 
  var blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]

});


  L.marker([41.89,-87.76], {icon: blueIcon}).addTo(map); 
  L.marker([41.93,-87.75], {icon: blueIcon}).addTo(map); 
  L.marker([41.7,-87.7], {icon: blueIcon}).addTo(map);

  




};





                    



function creatbar() {

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*2 + ")");

var select = d3.select('#bar')
  .append('select')
    .attr('class','select')
    .on('change',onchange)



var options = select
  .selectAll('option')
    .data(gang).enter()
    .append('option')
    .text(function (d) { return d.School_Name; });

function onchange() {
    selectValue = d3.select('select').property('value')
    d3.select('#bar')
    .append('p')
    .text(selectValue + ' bar chart is on the way.')




};

};


 


                    


