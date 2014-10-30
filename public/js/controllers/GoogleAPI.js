define(function(require) {
    "use strict";

    var apiKey= "AIzaSyCq_91BBy4ZbVONUZe4GSlIyry6wmQVXWk";
    var GoogleAPI = Marionette.Controller.extend({
        //https://maps.googleapis.com/maps/api/directions/json?origin=32.0647671,34.768938&destination=32.0898,34.7798&waypoints=&sensor=false&key=AIzaSyCq_91BBy4ZbVONUZe4GSlIyry6wmQVXWk&
        params:{
            origin: null,
            destination: "lat/long",
            waypoints: "",
            sensor: "false",
            key: apiKey
        },
        initialize: function(options) {
            this.attempt= 0;
            this.directionsDisplay;
            this.directionsService = new google.maps.DirectionsService();
            this.map;
            $.Deferred(_.bind(this.getOrigin,this));
            google.maps.event.addDomListener(window, 'load', _.bind(this.showMap,this));
        },
        calc:function(options){
            this.params.destination = options.destination;
            if(this.attempt === 0){
                $.when( $.Deferred(_.bind(this.getOrigin,this)) )
                .done(function(self, msg){
                    _.bind(reshowMap, self);
                })
                .fail(function(err){
                    console.error("failed fetching Google route " + err); 
                });
            }else{
                reshowMap.call(this);
            }

            function reshowMap(){
                var start = this.params.origin;
                var end = document.getElementById('end').value;
                var request = {
                  origin:start,
                  destination:end,
                  travelMode: google.maps.TravelMode.DRIVING
                };
                this.directionsService.route(request, _.bind(function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                      this.directionsDisplay.setDirections(response);
                      var duration= response.routes[0].legs[0].duration.text;
                      var distance= response.routes[0].legs[0].distance.text;
                      $("#duration").text(duration + "⌖" + distance);
                    }
                },this));
            }
        },
        getOrigin: function(deferred){
            if(this.attempt === 0){
                this.attempt++;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(_.bind(showPosition,this));
                } else {
                    deferred.reject("Geolocation is not supported by this browser.");
                }
            }
            function showPosition(position) {
                var lat= position.coords.latitude;
                var lon= position.coords.longitude;
                console.log("Latitude: " + lat + "Longitude: " + lon); 
                this.params.origin= lat + "," + lon;
                this.showMap(lat,lon);
                deferred.resolve(this, "your lon/lat is " + this.params.origin);
            }
            return deferred.promise();
        },
        showMap: function(lat, lon){
          this.directionsDisplay = new google.maps.DirectionsRenderer();
          var origin = new google.maps.LatLng(lat,lon);
          var mapOptions = {
            zoom: 16,
            center: origin
          };
          this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          this.directionsDisplay.setMap(this.map);
        }
    });
    window.GoogleAPI= new GoogleAPI();

});
