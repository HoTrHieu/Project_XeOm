import React, { Component } from 'react';



class Find extends Component {

    constructor(props) {
        super(props);
        this.state={
            DiemA:{lat:10.773595,lng: 106.694417},
            DiemB:{lat:10.762987,lng: 106.682150},
            TaiXe:{lat: 10.779691, lng: 106.699073},
            WayPointT:[],
            WayPointK:[]
        }
    }
    

    initMap = async(nameDon='',nameDen='')=> {
        var self =this;
        console.log("LenMap")
        var markerArray=[];
        // Instantiate a directions service.
        var directionsService = new window.google.maps.DirectionsService;
    
        // Create a map and center it on Manhattan.
        var map = new window.google.maps.Map(document.getElementById('myMap'), {
            zoom: 13,
            center: {lat: this.state.TaiXe.lat, lng: this.state.TaiXe.lng}
        });
    
        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new window.google.maps.DirectionsRenderer({map: map});
    
        // Instantiate an info window to hold step text.
        var stepDisplay = new window.google.maps.InfoWindow;

        var marker = new window.google.maps.Marker({
            position: self.state.TaiXe,
            map: map,
            title: 'H'
        });
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
            await this.calculateAndDisplayRouteProps(directionsDisplay, directionsService,self.state.TaiXe,self.state.DiemA,self.state.WayPointT);
            await this.calculateAndDisplayRouteProps(directionsDisplay, directionsService,self.state.DiemA,self.state.DiemB,self.state.WayPointK);
        }
        map.setCenter(self.state.TaiXe);
    }
    
    calculateAndDisplayRouteProps=async(directionsDisplay, directionsService,DiemA,DiemB,WayPoint)=>{  
        var self= this;  
        var request = {
            origin: new window.google.maps.LatLng(DiemA.lat,DiemA.lng),
            destination: new window.google.maps.LatLng(DiemB.lat,DiemB.lng),
            travelMode: 'DRIVING',
            unitSystem: window.google.maps.UnitSystem.METRIC
            }; 
    
            directionsService.route(request,async function(response, status) {
                if (status === 'OK') {                    
                        await directionsDisplay.setDirections(response);                    
                        self.GetWayPoint(response,WayPoint)
                } else {
                    console.log("khong lay duoc way point")
                        //window.alert('Directions request failed due to ' + status);
                }
                
            });
    
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
        console.log("Waipoint 1:",this.state.WayPointK)
        console.log("Waipoint 2:",this.state.WayPointT)
    }
    
    render() {
        return (
            <div id="contentFindDriver">
            <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-2 wrapperImg">
                <div className="img text-center">
                    <img
                    src="./templates/users/lib/images/user.png"
                    className="img-fluid"
                    alt="img"
                    />
                    <p className="tenBacTai">
                    <b>HO CONG HAU</b>
                    </p>
                    <p>
                    <i className="fas fa-mobile-alt" />
                    &nbsp;0123456789
                    </p>
                </div>
                </div>
                <div className="col-xs-12 col-md-8 map">
                        <div style={{ width: `100%`, height: `100%` }} id="myMap" >
                            <div id="warnings-panel" style={{width: `100%`, height:`100%`, textAlign: 'center'}}>

                            </div>
                        </div>
                </div>
                <div className="col-xs-12 col-md-2 wrapperImg">
                <div className="img text-center">
                    <img
                    src="./templates/users/lib/images/user.png"
                    className="img-fluid"
                    alt="img"
                    />
                    <p className="bienSoXe">
                    <b>51G-11111</b>
                    </p>
                </div>
                </div>
            </div>{" "}
            {/* row */}
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button className="btn btn-danger btnAction">
                        Hủy&nbsp;
                        <i className="far fa-times-circle" />
                    </button>&nbsp;
                    <button className="btn btn-success btnAction">
                        Đặt xe&nbsp;
                        <i className="far fa-check-circle" />
                    </button>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Find;