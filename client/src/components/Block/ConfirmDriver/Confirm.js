import React, { Component } from "react";

class Confirm extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            DiemA:{lat:10.773595,lng: 106.694417},
            DiemB:{lat:10.762987,lng: 106.682150},
            TaiXe:{lat: 10.779691, lng: 106.699073},
            WayPointT:[],
            WayPointK:[],
            MTaiXe:null
        }
    }
    

    initMap = async(nameDon='',nameDen='')=> {
        var self =this;
        //console.log("LenMap")
        
        // Instantiate a directions service.
        var directionsService = new window.google.maps.DirectionsService;
    
        // Create a map and center it on Manhattan.
        var map = new window.google.maps.Map(document.getElementById('myMap'), {
            zoom: 13,
            center: {lat: this.state.TaiXe.lat, lng: this.state.TaiXe.lng}
        });
    
        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new window.google.maps.DirectionsRenderer({map: map,suppressMarkers: true});
        var directionsDisplay2 = new window.google.maps.DirectionsRenderer({map: map,suppressMarkers: false});
        // Instantiate an info window to hold step text.
        var stepDisplay = new window.google.maps.InfoWindow;


        //vòng tròn thần thánh
        var cityCircle = new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: self.state.TaiXe,
            radius:200
            });

        
        if(directionsDisplay!==null){
            var icons = new window.google.maps.MarkerImage(
                // URL
                './motorcycle.svg',
                // (width,height)
                new window.google.maps.Size(44, 32),
                // The origin point (x,y)
                new window.google.maps.Point(0, 0),
                // The anchor point (x,y)
                new window.google.maps.Point(22, 32),
                new window.google.maps.Size(50, 50)
            );
                
            
            await this.calculateAndDisplayRouteProps(directionsDisplay, directionsService, self.state.WayPointT, stepDisplay, map,self.state.TaiXe,self.state.DiemA,icons);
            await this.calculateAndDisplayRouteProps(directionsDisplay2, directionsService, self.state.WayPointK, stepDisplay, map,self.state.DiemA,self.state.DiemB);
        }
        map.setCenter(self.state.TaiXe);
    }
    
    calculateAndDisplayRouteProps=async(directionsDisplay, directionsService, markerArray, stepDisplay, map,DiemA,DiemB,icons=null)=>{  
        var self= this;  
        var request = {
            origin: new window.google.maps.LatLng(DiemA.lat,DiemA.lng),
            destination: new window.google.maps.LatLng(DiemB.lat,DiemB.lng),
            travelMode: 'DRIVING',
            unitSystem: window.google.maps.UnitSystem.METRIC
            }; 
    
            directionsService.route(request,async function(response, status) {
                if (status === 'OK') {      

                    await self.showSteps(response, stepDisplay, map,icons)
                    await directionsDisplay.setDirections(response); 
                    if(icons!==null){
                         var leg = response.routes[0].legs[0];
                         var mar= self.makeMarker(leg.start_location,icons,"H1",map)
                         console.log(mar)
                         self.setState({
                            MTaiXe:mar
                         })
                    } 
                        //config icon
                        
                    

                                          
                    self.GetWayPoint(response,markerArray)

                } else {
                    console.log("khong lay duoc way point")
                        //window.alert('Directions request failed due to ' + status);
                }
                
            });
    
    }
    
    makeMarker(position, icon, title, map) {
        var marker=new window.google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
        
        return marker;
    }
    showSteps=async(directionResult, stepDisplay, map,icon=null)=>{
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        
        //console.log(myRoute.steps[0].start_location);
        // var myRoute = directionResult.routes[0].legs[0];
        //     for (var i = 0; i < myRoute.steps.length; i++) {
        //         var marker = markerArray[i] = markerArray[i] || new window.google.maps.Marker;
        //         marker.setMap(map);  
                             
        //         marker.setPosition(myRoute.steps[i].start_location);                 
        //         this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
        //     }

        if(icon!==null){
            var myRoute = directionResult.routes[0].legs[0];
            for (var i = 1; i < myRoute.steps.length; i++) {
                var marker = new window.google.maps.Marker;
                marker.setMap(map);                
                marker.setPosition(myRoute.steps[i].start_location);                 
                this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
            }
        }
        else{
            var myRoute = directionResult.routes[0].legs[0];
            for (var i = 0; i < myRoute.steps.length; i++) {
                var marker = new window.google.maps.Marker;
                marker.setMap(map);                
                marker.setPosition(myRoute.steps[i].start_location);                 
                this.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
            }
        }
        
        //console.log(arrayPos);
  }
    

    GetWayPoint=(directionResult,WayPoint)=>{
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
            WayPoint[i]=myRoute.steps[i].start_location;
        }
    }
    
    attachInstructionText=(stepDisplay, marker, text, map) =>{
    window.google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
    });
    
    
    }
    
    
    async componentDidMount() {
        await this.initMap();
        console.log("Waipointl 1:",this.state.WayPointK)
        console.log("Waipointl 2:",this.state.WayPointT)
        console.log("ma",this.state.MTaiXe)
    }

render() {
    return (
        <div id="confirmDriver">
            {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.67522812481!2d106.67437147917477!3d10.766478188433842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRwLiBIQ00!5e0!3m2!1svi!2s!4v1559716477029!5m2!1svi!2s"
                width="100%"
                height="100%"
                frameBorder={0}
                style={{ border: 0 }}
                allowFullScreen
                title="mapConfirm"
            /> */}
            <div style={{ width: `100%`, height: `100%` }} id="myMap" ></div>

            
            <div className=" col-xs-12 col-md-4 bookCustomer">
                <h4 className="titleBook" style={{ color: "#fff" }}>
                    Thông tin khách hàng
                </h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Địa điểm đón"
                        aria-describedby="helpId"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Địa điểm đến"
                        aria-describedby="helpId"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        aria-describedby="helpId"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số km dự tính : 15km"
                        aria-describedby="helpId"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số tiền dự tính : 30.000đ"
                        aria-describedby="helpId"
                        readOnly
                    />
                </div>
                <div className="form-group text-right">
                    <div className="row">
                        <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-success btn-block btnRegister btn-danger"
                        >
                            Không Nhận &nbsp;
                            <i className="far fa-times-circle" />
                        </button>
                        </div>
                        <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-success btn-block btnRegister btn-block"
                        >
                            Nhận Chuyến&nbsp;
                            <i className="far fa-check-circle" />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default Confirm;
