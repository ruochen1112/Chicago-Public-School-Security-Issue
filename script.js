


var margin = {top: 30, right: 20, bottom: 57, left: 30}
var width = 900;
var height = 350;




   creatmap();

 

  d3.json("test_gang.json", function(error,data) {
        gang = data;


      
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

    d3.json("geodata.json", function(error,collection) {
      if(error){
        console.log(error);
      } else {

        collection[0].features.forEach(function(d){
            d.LatLng = new L.LatLng(d.geometry.coordinates[1],
                                    d.geometry.coordinates[0])


            var markerLocation = d.LatLng;
            var color = {icon: orangeIcon};
            if (d.properties.rating == "Level 3"){color = {icon: greyIcon};}
            else if (d.properties.rating == "Level 2"){color = {icon: yellowIcon};}


            var marker = new L.Marker(markerLocation,color).bindPopup("Name:"+d.properties.School_Name+"<br/>"
              +"Rating: "+d.properties.rating +"<br/>"+ "Gang Activeties: "+d.properties.Counts);
            

            map.addLayer(marker);


          });

        };

    });
 

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



};

//function dropdownmenu() {

//var svg = d3.select("#menu").append("svg")
    //.attr("width", width + margin.left + margin.right)
   // .attr("height", 5);

//var select = d3.select('#menu')
   // .append('select')
   // .attr('class','select')
   // .on('change',onchange)

//var options = select
  //.selectAll('option')
 // .data(gang).enter()
    //.append('option')
   // .text(function (d) { return d.School_Name; });

//function onchange() {
   // selectValue = d3.select('select').property('value')
   //d3.select('#menu')
   // .append('h2')
   // .text(selectValue + ' bar chart is on the way.')

//};


//}
     
 
  d3.json("gang.json", function(error,data) {
        dataset = data;


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
    var unique = dataset.filter( onlyUnique )
 
 console.log(unique);


  creatbar();  


  });

  
                  

 function  creatbar() {

    var svg = d3.select("body")
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

 

    svg.append("g")
      .attr("class", "axis axis--x")
      .call(d3.axisTop(xScale))
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) {
                return "rotate(65)" 
                });

    svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));


  svg.selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.Gang_Name);})
    .attr("y", function(d){
      return yScale(+d[selection]);})
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return yScale(y(+d[selection]));}); 

    var selector = d3.select("#menu")
      .append("select")
      .attr("id","dropdown")
      .on("change", function(d){
          selection = document.getElementById("dropdown");

          y.domain([0, d3.max(dataset, function(d){
        return +d[selection.value];})]);

          d3.axisLeft(yScale).scale(yScale);

          d3.selectAll(".rectangle")
              .transition()
              .attr("height", function(d){
          return height - y(+d[selection.value]);
        })
        .attr("x", function(d, i){
          return (width / data.length) * i ;
        })
        .attr("y", function(d){
          return y(+d[selection.value]);
        })
              .ease("linear")
             
      
            d3.selectAll("g.y.axis")
              .transition()
              .call(d3.axisLeft(yScale));

         });

    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })
 

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



//};








 


                    


