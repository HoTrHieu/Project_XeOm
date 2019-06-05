import React, { Component } from 'react';


var arrayPos=[];
var numDeltas = 100;
var delay = 100; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;
var position = [10.773583,106.694368];//set điểm bắt đầu

var map;
//var MymarkerArray = [];
var marker;

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state={
            waypoint:[]
        }
    }
    

    initMap=async()=> {
        
        var markerArray=[];
        // Instantiate a directions service.
        var directionsService = new window.google.maps.DirectionsService;

        // Create a map and center it on Manhattan.
        map = new window.google.maps.Map(document.getElementById(this.props.id), {
            zoom: 13,
            center: {lat: 10.762622, lng: 106.660172}
        });

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new window.google.maps.DirectionsRenderer({map: map});

        // Instantiate an info window to hold step text.
        var stepDisplay = new window.google.maps.InfoWindow;

        // Display the route between the initial start and end selections.
        await this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // Listen to change events from the start and end lists.
        // var onChangeHandler = function() {
        //   this.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // };
        //document.getElementById('location-input-don').addEventListener('change', onChangeHandler);
        //document.getElementById('location-input-den').addEventListener('change', onChangeHandler);
        await console.log(document.getElementById('location-input-den').value);
        
    }



   
      
      calculateAndDisplayRoute=async(directionsDisplay, directionsService, markerArray, stepDisplay, map)=>{
            // First, remove any existing markers from the map.
            var self= this;
            for (var i = 0; i < markerArray.length; i++) {
                markerArray[i].setMap(null);
            }
            var request = {
                origin: 'Bến Thành, Quận 1, Hồ Chí Minh, Việt Nam',
                destination: 'Trường Đại học Khoa học Tự nhiên Tp. HCM, 227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam',
                travelMode: 'DRIVING'
              };  


             directionsService.route(request,async function(response, status) {
                    // Route the directions and pass the response to a function to create
                    // markers for each step.
                    
                if (status === 'OK') {
                        //document.getElementById('warnings-panel').innerHTML ='<b>' + response.routes[0].warnings + '</b>';
                        await directionsDisplay.setDirections(response);                    
                        //ShowStep
                        await self.showSteps(response, markerArray, stepDisplay, map)
                        
                        var myWay=[];
                        for(var i =0;i<markerArray.length;i++){
                            var temp={lat:markerArray[i].getPosition().lat(),lng:markerArray[i].getPosition().lng()};
                                myWay[i]=temp;
                            
                        }    
                        self.setState({
                            waypoint:myWay
                        })                    
                        //console.log(self.state.waypoint)
                        //console.log(myWay)
                } else {
                        window.alert('Directions request failed due to ' + status);
                }
             });

      }
  
    showSteps=(directionResult, markerArray, stepDisplay, map)=>{
            // For each step, place a marker, and add the text to the marker's infowindow.
            // Also attach the marker to an array so we can keep track of it and remove it
            // when calculating new routes.
            var myRoute = directionResult.routes[0].legs[0];
            //console.log(myRoute.steps[0].start_location);
            for (var i = 0; i < myRoute.steps.length; i++) {
                var marker = markerArray[i] = markerArray[i] || new window.google.maps.Marker;
                marker.setMap(map);                
                marker.setPosition(myRoute.steps[i].start_location);  

                arrayPos[i]=myRoute.steps[i].start_location;
                this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
            }
            //console.log(arrayPos);
      }
    
    attachInstructionText=(stepDisplay, marker, text, map) =>{
        window.google.maps.event.addListener(marker, 'click', function() {
            // Open an info window when the marker is clicked on, containing the text
            // of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
        });

    
    }


     handleMove=(markerArray)=>{
        var self= this;        
         console.log(markerArray);
        if(markerArray.length !== 0){
            //tạo marker chạy:
            console.log("ok")
            var latlng={lat:markerArray[0].getPosition().lat(),lng:markerArray[0].getPosition().lng()};
            //set lại biến position
            position[0]=latlng.lat;
            position[1]=latlng.lng;
            marker = new window.google.maps.Marker({
                position: latlng,
                map: map,
                title: "Latitude:"+latlng.lat +" | Longitude:"+latlng.lng
            });

            var a=1;
            while(a < markerArray.length){                                    
                    var result={lat:markerArray[a].getPosition().lat(),lng:markerArray[a].getPosition().lng()};                                                
                     self.transition(result)
                    a++
            }
                                   
        }
    }
    transition(result){        
        // var a=1;
        // while(a < markerArray.length){                                    
        //     var result={lat:markerArray[a].getPosition().lat(),lng:markerArray[a].getPosition().lng()};                                                
        //     i = 0;
        //     deltaLat = (result.lat - position[0])/numDeltas;
        //     deltaLng = (result.lng - position[1])/numDeltas;
        //     this.moveMarker();
        //     a++
        // }

        i = 0;
        deltaLat = (result.lat - position[0])/numDeltas;
        deltaLng = (result.lng - position[1])/numDeltas;
        return this.moveMarker();
    }
    
    moveMarker=()=>{
        position[0] += deltaLat;
        position[1] += deltaLng;
        var latlng = new window.google.maps.LatLng(position[0], position[1]);
        
        marker.setTitle('new title');
        marker.setPosition(latlng);        
        if(i !== numDeltas){
            i++;
            setTimeout(this.moveMarker, delay);
        }
        
    }
      
   
    
    async componentDidMount (){
        var self = this;
        
        await self.initMap()
        
        //console.log(this.state.waypoint)
        //await console.log()
        self.handleMove(self.state.waypoint);
    }

    
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(this.props.latDon)
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        //console.log("ok")
        console.log(this.state.waypoint)
    }
    
    
    render() {
        return (
            <div style={{ width: `100%`, height: `100%` }} id={this.props.id} >
                <div id="warnings-panel" style={{width: `100%`, height:`10%`, textAlign: 'center'}}>

                </div>
            </div>
        );
    }
}

export default MyMap;