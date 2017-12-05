


var margin = {top: 30, right: 20, bottom: 50, left: 30}
var width = 580;
var height = 250;
var padding = -10; 
var map;
var g;
var x;
var y;
var xAxis;
var yAxis;







   creatmap();




  


function creatmap() {


    map = L.map('map',{zoomControl: false}).setView([41.88, -87.63], 12);
        mapLink = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


  
    
    var svg = d3.select("#map")
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom*2);

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

           marker.on('click', function(){
            d3.csv("gang.csv", function(error, data){

           var school_name = d.properties.School_Name;

       var change = data.filter(function(d){ return d["SchoolName"] == school_name;});

       y = d3.scale.linear()
             .domain([0, d3.max(change, function(d){
             return +d["TOTAL"];
             })])
             .range([0,height]);

       x = d3.scale.ordinal()
          .domain(change.map(function(d){ return d.NAME;}))
          .rangeBands([0, width]);

       xAxis = d3.svg.axis()
          .scale(x)
          .orient("top");

       yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");
          
           g.selectAll(".rectangle")
              .data(change, function(d) { return d.NAME})
              .exit().remove()
 
            g.selectAll(".rectangle")
              .data(change, function(d) { return d.NAME})
              .enter()
              .append("rect")
              .attr("class", "rectangle")
              .attr("x", function(d, i){
                return ( width / change.length) * i ;
              })
              .attr("y", 0)
              .attr("width", width / change.length)
              .transition().duration(2000)
              .attr("height", function(d){
                return y(+d["TOTAL"]);
              });
 
            g.selectAll(".rectangle")
              .data(change, function(d) { return d.NAME})
              .attr("x", function(d, i){
                return ( width / change.length) * i ;
              })
              .attr("width", width / change.length)
              .transition().duration(2000)
              .attr("height", function(d){
                return y(+d["TOTAL"]);
              });
      
            d3.selectAll("g.y.axis")
            
              .transition()
              .call(yAxis);
            d3.selectAll("g.x.axis")
              .transition()
              .call(xAxis)
              .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", "-.15em")
             .attr("transform", "rotate(90)");
           });
           });
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

var lat = 41.88;
var lng = -87.63;
var zoom = 12;
// custom zoom bar control that includes a Zoom Home function
L.Control.zoomHome = L.Control.extend({
    options: {
        position: 'topright',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: 'O',
        zoomHomeTitle: 'Zoom home'
    },

    onAdd: function (map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },

    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function (e) {
        map.setView([lat, lng], zoom);
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});

var zoomHome = new L.Control.zoomHome();
zoomHome.addTo(map);

};


 

d3.csv("gang.csv", function(error, data){

  creatbar();  


  });

  
                  

 function  creatbar() {


  var svg = d3.select("#bar")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom*5);
 
  g = svg.append('g')
     .attr("transform", "translate(" + margin.left*1+ "," + margin.top*8+ ")")

  

d3.csv("gang.csv", function(error, data){
    var input = data.filter(function(d){ return true;});
    var tmp = data.filter(function(d){ return d["SchoolName"] == "Air Force Academy High School";});

   y = d3.scale.linear()
         .domain([0, d3.max(tmp, function(d){
         return +d["TOTAL"];
         })])
         .range([0,height]);

   x = d3.scale.ordinal()
      .domain(tmp.map(function(d){ return d.NAME;}))
      .rangeBands([0, width]);

   xAxis = d3.svg.axis()
      .scale(x)
      .orient("top");

   yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+padding+",0)")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(90)" );


  g.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  g.selectAll("rectangle")
    .data(tmp)
    .enter()
    .append("rect")
    .attr("class","rectangle")
    .attr("width", width / tmp.length)
    .attr("height", function(d){
      return y(+d["TOTAL"]);
    })
    .attr("x", function(d, i){
      return (width / tmp.length) * i ;
    })
    .attr("y",0 );

    g.append("text")
    .attr("class", "lableText")
    .attr("transform", "rotate(-90)")
    .attr("dx", "-8em")
    .attr("dy", "-2.5em")
    .text("Counts");
})
};












 


                    


