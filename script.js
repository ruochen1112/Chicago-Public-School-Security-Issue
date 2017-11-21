


var margin = {top: 30, right: 20, bottom: 57, left: 30}
var width = 900;
var height = 350;




   creatmap();





  d3.json("test_gang.json", function(error,data) {
        gang = data;
        
       dropdownmenu();
});


  


function creatmap() {


    var map = L.map('map').setView([41.88, -87.63], 12);
        mapLink = 
            '<a href="https://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);

    map._initPathRoot()  
  

    var svg = d3.select("#map")
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom*2);


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
            .attr("class","circle")
            .attr("r", 10);
        
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
  L.marker([41.88520477,-87.76321191], {icon: greyIcon}).addTo(map).bindPopup("Name:Austin Polytechnical Academy High School<br/>Level:3 <br/> Gang Activeties:1156");;


};





                  
function dropdownmenu() {

var svg = d3.select("#menu").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 5);

var select = d3.select('#menu')
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
    d3.select('#menu')
    .append('h2')
    .text(selectValue + ' bar chart is on the way.')

};



 
  d3.json("test_gang_chart.json", function(error,data) {
        dataset = data;
        
          creatbar();
        
      
  });

 function  creatbar() {

    var svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom*6);

  var g = svg.append('g')
    .attr("transform", "translate(" + margin.left*2 + "," + margin.top*7 + ")")


    var xScale = d3.scaleBand()
    .domain(dataset.map(function(d) { return d.Gang_Name; }))
    .rangeRound([0, width])
    .padding(0.1);

    var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset, function(d) { return d.TOTAL; })])
    .rangeRound([0,height])

 

    g.append("g")
      .attr("class", "axis axis--x")
      .call(d3.axisTop(xScale))
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
                return "rotate(65)" 
                });

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));


  g.selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.Gang_Name); })
    .attr("y", 0)
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return yScale(d.TOTAL); })



    g.append("text")
    .attr("class", "lableText")
    .attr("dx", "28em")
    .attr("dy", "-10em")            
    .style("text-anchor", "middle")
    .text("Active Gangs");

    g.append("text")
    .attr("class", "lableText")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .attr("dx", "-10em")
    .attr("dy", "-2.5em")
    .text("Counts");

  




};


};








 


                    


