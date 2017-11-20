


var margin = {top: 30, right: 20, bottom: 57, left: 30}
var width = 1000;
var height = 600;




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
var yellowIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

  var orangeIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


var greyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

  L.marker([41.87859028,-87.66419634], {icon: orangeIcon}).addTo(map).bindPopup("Name:Whitney M Young Magnet High School <br/>Level:1 <br/> Gang Activeties:24"); 
  L.marker([41.92003613,-87.76108432], {icon: yellowIcon}).addTo(map).bindPopup("Name:Prosser Career Academy High School<br/>Level:2 <br/> Gang Activeties:592");
  L.marker([41.88520477,-87.76321191], {icon: greyIcon}).addTo(map).bindPopup("Name:Austin Polytechnical Academy High School<br/>Level:1156 <br/> Gang Activeties:592");;

  




};





                    



function creatbar() {

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height - margin.top - margin.bottom*10)
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


 


                    


