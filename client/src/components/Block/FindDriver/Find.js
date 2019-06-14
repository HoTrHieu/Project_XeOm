import React, { Component } from "react";
import socketClient from "socket.io-client"
import { withRouter } from "react-router-dom";

import axios from "axios"
let socket


let numDeltas = 100;
let delay = 100; //milliseconds
let i = 0;
let deltaLat;
let deltaLng;
let position = []; //set điểm bắt đầu
let map;
//var MymarkerArray = [];
var marker;
let Clicked=0;
class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DiemA: "",
            DiemB: "",
            TaiXe: {},
            DiemEnd: null,
            WayPointT: [],
            WayPointK: [],
            point: "http://localhost:8080/",
            TTtaixe: {}
        };
        socket = socketClient(this.state.point)
        

    }

    deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires="+Date.now().toString;
        }
    }


   shouldComponentUpdate(nextProps, nextState) {
       
        return true;
   }
   
    
    componentWillMount() {
        socket.on("truyen-from-confirm-to-find", data=>{
            this.setState({
                DiemA: data.noiDon,
                DiemB: data.noiDen,
                TaiXe: data.taixe.toaDo,
                TTtaixe:data.taixe
            })
            this.initMap(data.noiDon,data.noiDen,data.taixe.toaDo);
         })
    }
    
    
    componentDidMount() {
          // show hide form book 
        var btnShowHideForm = document.getElementById('btnShowHideForm');
        var bookCustomer = document.getElementById('bookCustomer');
        btnShowHideForm.addEventListener('click',()=>{
            if(btnShowHideForm.innerHTML==='<i class="fas fa-eye"></i>'){
                btnShowHideForm.innerHTML='<i class="fas fa-eye-slash"></i>'
            }else {
                btnShowHideForm.innerHTML = '<i class="fas fa-eye"></i>'
            }
            bookCustomer.classList.toggle('action_show_hide_form');
        })
        Clicked=0;
    }

    componentWillUpdate() {
        // setTimeout(() => {
        //     this.socketFind()
        // }, 200);

    }

    async componentDidUpdate(prevProps, prevState) {
        let self = this;
        if (self.state.WayPointK.length !== 0) {
            let a = 0;
            let arrayTemp = await self.MerArray(self.state.WayPointT,self.state.WayPointK,self.state.DiemEnd);
            self.handleMove(arrayTemp, a);
        }
    }
    

    handleEnd=async()=>{
        localStorage.removeItem('sodienthoaiKH');
        await window.alert("Cảm ơn bạn đã chọn dịch vụ Xe Ôm H3!");
        this.deleteAllCookies();
        this.props.history.push("/")  
    }
    render() {
        // console.log(this.socketFind())
        // console.log(taixes)
        // hoten: taixe.HoTen,
        //         sodienthoai: taixe.SoDienThoai,
        //         biensoxe: taixe.BienSoXe
        const { hoten, sodienthoai, biensoxe, anhbactai } = this.state.TTtaixe
        return (
            <div id="contentFindDriver">
                <div id="myMap">
                    <div
                        id="warnings-panel"
                        style={{ width: `100%`, height: `100%`, textAlign: "center" }}
                    />
                </div>
                <div className=" col-xs-12 col-md-4 bookCustomer findDriver" id="bookCustomer">
                    <h4 className="titleBook" style={{ color: "#fff", textAlign: "center" }}>
                        Thông tin bác tài
            </h4>
                    <div className="form-group">
                        <div className="row text-center">
                            <div className="col-12">
                                <img
                                    // src={"./templates/users/lib/images/administrator-male.png"}
                                    src={anhbactai}
                                    className="img-fluid"
                                    style={{ height: "100px" }}
                                    alt="anhbactai"
                                />
                                <h6 style={{ color: "#fff" }}>
                                    <i>{hoten} - {sodienthoai}</i>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="form-group slideXe">
                        <div
                            id="demo"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            {/* Indicators */}
                            <ul className="carousel-indicators">
                                <li
                                    data-target="#demo"
                                    data-slide-to={0}
                                    className="active"
                                />
                                <li data-target="#demo" data-slide-to={1} />
                                <li data-target="#demo" data-slide-to={2} />
                            </ul>
                            {/* The slideshow */}
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img
                                        src="./templates/users/lib/images/01_hero_banner.jpg"
                                        alt="anhxe"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="./templates/users/lib/images/02_hero_banner.jpg"
                                        alt="anhxe"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="./templates/users/lib/images/grab_safety_headerimage.png"
                                        alt="anhxe"
                                    />
                                </div>
                            </div>
                            {/* Left and right controls */}
                            <a
                                className="carousel-control-prev"
                                href="#demo"
                                data-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" />
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#demo"
                                data-slide="next"
                            >
                                <span className="carousel-control-next-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="form-group text-right">
                        <div className="row">
                            <div className="col-12">
                                <button
                                    onClick={this.handleEnd}
                                    type="button"
                                    className="btn btn-light btn-block btnRegister btn-block"
                                >
                                    Xác Nhận&nbsp;
                                    <i className="far fa-check-circle" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnShowHideForm btnShowHideFormFind" id="btnShowHideForm" data-toggle="tooltip" title="Đặt xe!">
                <i className="fas fa-eye"></i>
            </div>
            </div>
        );
    }
    
initMap = async (DiemA = "", DiemB = "", TaiXe = null) => {
    var self = this;
    
    // Instantiate a directions service.
    var directionsService = new window.google.maps.DirectionsService();

    // Create a map and center it on Manhattan.
    map = new window.google.maps.Map(document.getElementById("myMap"), {
        zoom: 13,
        center: { lat: TaiXe.lat, lng: TaiXe.lng }
    });

    // Create a renderer for directions and bind it to the map.
    var directionsDisplay = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });
    var directionsDisplay2 = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false
    });
    // Instantiate an info window to hold step text.
    var stepDisplay = new window.google.maps.InfoWindow();


    //vòng tròn thần thánh
    var cityCircle = new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: TaiXe,
        radius: 200
    });

    var icons = new window.google.maps.MarkerImage(
        // URL
        "./motorcycle.svg",
        // (width,height)
        new window.google.maps.Size(44, 32),
        // The origin point (x,y)
        new window.google.maps.Point(0, 0),
        // The anchor point (x,y)
        new window.google.maps.Point(22, 32),
        new window.google.maps.Size(50, 50)
    );
    if (directionsDisplay !== null) {
        var icons = new window.google.maps.MarkerImage(
        // URL
        "./motorcycle.svg",
        // (width,height)
        new window.google.maps.Size(44, 32),
        // The origin point (x,y)
        new window.google.maps.Point(0, 0),
        // The anchor point (x,y)
        new window.google.maps.Point(22, 32),
        new window.google.maps.Size(50, 50)
        );

        await this.calculateAndDisplayRouteProps(
        directionsDisplay,
        directionsService,
        stepDisplay,
        map,
        TaiXe,
        DiemA,
        icons
        );
        await this.calculateAndDisplayRouteProps(
        directionsDisplay2,
        directionsService,
        stepDisplay,
        map,
        DiemA,
        DiemB
        );
    }
    map.setCenter(TaiXe);
};

calculateAndDisplayRouteProps = async (
    directionsDisplay,
    directionsService,
    stepDisplay,
    map,
    DiemA,
    DiemB,
    icons = null
) => {
    var self = this;
    var markerArray = [];
    let request;
    if (icons === null) {
        request = {
        origin: DiemA, //new window.google.maps.LatLng(DiemA.lat,DiemA.lng),
        destination: DiemB, //new window.google.maps.LatLng(DiemB.lat,DiemB.lng),
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC
        };
    } else {
        request = {
        origin: new window.google.maps.LatLng(DiemA.lat, DiemA.lng), //tài xế
        destination: DiemB, //new window.google.maps.LatLng(DiemB.lat,DiemB.lng),
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC
        };
    }

    directionsService.route(request, async function(response, status) {
        if (status === "OK") {
        //await self.showSteps(response, stepDisplay, map, icons);
        await directionsDisplay.setDirections(response);
        if (icons !== null) {
            var leg = response.routes[0].legs[0];
            console.log("kiemtraToaDo",leg.start_location)
            marker = self.makeMarker(leg.start_location, icons, "H1", map);
            
            //markerArray
            await self.GetWayPoint(response, markerArray);
            self.setState({
                //MTaiXe:mar,
                WayPointT: markerArray
            });
        } else {
            
            let latEnd = response.routes[0].legs[0].end_location.lat();
            let lngEnd = response.routes[0].legs[0].end_location.lng();
            let MYEND = { lat: latEnd, lng: lngEnd };
            await self.GetWayPoint(response, markerArray);
            self.setState({
                WayPointK: markerArray,
                DiemEnd: MYEND
            });
        }
        } else {
            console.log("khong lay duoc way point", DiemA);
        //window.alert('Directions request failed due to ' + status);
        }
    });
};

showSteps = async (directionResult, stepDisplay, map, icon = null) => {
    if (icon !== null) {
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 1; i < myRoute.steps.length; i++) {
        var marker = new window.google.maps.Marker();
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        this.attachInstructionText(
            stepDisplay,
            marker,
            myRoute.steps[i].instructions,
            map
        );
        }
    } else {
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = new window.google.maps.Marker();
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        this.attachInstructionText(
            stepDisplay,
            marker,
            myRoute.steps[i].instructions,
            map
        );
        }
    }

    
};

GetWayPoint = (directionResult, WayPoint) => {
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        WayPoint[i] = {
        lat: myRoute.steps[i].start_location.lat(),
        lng: myRoute.steps[i].start_location.lng()
        };
    }
};

attachInstructionText = (stepDisplay, marker, text, map) => {
    window.google.maps.event.addListener(marker, "click", function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
};

makeMarker(position, icon, title, map) {
    var marker = new window.google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
        title: title
    });
    return marker;
}
handleMove = async (arrayT, a) => {
    var self = this;

    

    if (a === arrayT.length - 1) {
        setTimeout(() => {
            if(Clicked===0)
            {
                self.handleEnd();
            }
        }, 3000);
        return;
    }
    if (a === 0) {
        
        var latlng = { lat: arrayT[0].lat, lng: arrayT[0].lng };
        //set lại biến position
        position[0] = latlng.lat;
        position[1] = latlng.lng;
        //marker.setTitle("Latitude:"+latlng.lat +" | Longitude:"+latlng.lng)
    }

    a = a + 1;
    var result = { lat: arrayT[a].lat, lng: arrayT[a].lng };
    return self.transition(result, arrayT, a);
};
transition(result, arrayT, a) {
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
    deltaLat = (result.lat - position[0]) / numDeltas;
    deltaLng = (result.lng - position[1]) / numDeltas;
    return this.moveMarker(arrayT, a);
}

moveMarker = (arrayT, a) => {
    var self = this;
    position[0] += deltaLat;
    position[1] += deltaLng;
    let latlng = new window.google.maps.LatLng(position[0], position[1]);

    //marker.setTitle('new title');
    marker.setPosition(latlng);

    if (i !== numDeltas) {
        i++;
        setTimeout(() => this.moveMarker(arrayT, a), 10);
    } else {
        self.handleMove(arrayT, a);
    }
};
MerArray(arrayT, arrayK, DiemB) {
    var index = arrayT.length;
    var arrayMer = arrayT;
    for (var i = 0; i < arrayK.length; i++) {
        arrayMer[index++] = arrayK[i];
    }
    arrayMer[index++] = DiemB;
    return arrayMer;
}

}

export default withRouter(Find);
