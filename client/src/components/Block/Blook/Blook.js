import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import socketClient from "socket.io-client"
import Axios from "axios";
/* import ReactDOM from 'react-dom'; */
import jwt_decode from "jwt-decode";


let socket
let arrayTemp=[]
let directionsDisplay;
let map;
class Blook extends Component {
constructor(props) {
    super(props);
    this.state = {
        DiemDon: "",
        DiemDen: "",
        SDT: "",
        latDon: 0,
        lngDon: 0,
        latDen: 0,
        lngDen: 0,
        soKM: "",
        existsRound: false,
        requireInputDon: "",
        requireInputDen: "",
        requireInputSDT: "",
        point: 'http://localhost:8080',
        submitDriver: false,
        ArrayDriver:[],
        ArrayKhoangCach:[]
    };
    socket = socketClient(this.state.point)
     this.handleSubmit = this.handleSubmit.bind(this);
     this.TinhKhoangCach=this.TinhKhoangCach.bind(this);
}

componentWillMount() {
    this.GetAllDriver();
}
componentDidMount() {
    socket.on("truyen-den-trang-tai-xe-xac-nhan", data=>{
        console.log("thong tin",data)
        if(localStorage.getItem("sodienthoaiKH") === data.sdtKhach){
            console.log("SODienT..",data.sdtKhach);
             this.props.history.push("/find")    
            socket.emit("gui-thong-tin-tai-xe", data )
        }
      })
        
    
    this.initMap();

    var options = {
        types: [],
        componentRestrictions: {country: 'VN'}
    };
    var input1 = document.getElementById("location-input-don");
    var autocomplete1 = new window.google.maps.places.Autocomplete(
        input1,
        options
    );

    var input2 = document.getElementById("location-input-den");
    var autocomplete2 = new window.google.maps.places.Autocomplete(
        input2,
        options
    );

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
}
async handleSubmit(event) {
    event.preventDefault();
    var self = this;

    if (document.getElementById("location-input-don").value === "") {
        await this.setState({ requireInputDon: "Nhập địa điểm đón" });
    }
    if (document.getElementById("location-input-den").value === "") {
        await this.setState({ requireInputDen: "Nhập địa điểm đến" });
    }
    if (document.getElementById("input-sdt").value === "") {
        await this.setState({ requireInputSDT: "Nhập số điện thoại" });
    }
    if (document.getElementById("location-input-don").value !== "") {
        await this.setState({ requireInputDon: "" });
    }
    if (document.getElementById("location-input-den").value !== "") {
        await this.setState({ requireInputDen: "" });
    }

    if (document.getElementById("input-sdt").value !== "") {
        if (
        this.ValidateUSPhoneNumber(
            document.getElementById("input-sdt").value
        ) === false
        ) {
        await this.setState({
            requireInputSDT: "Số điện thoại chưa hợp lệ"
        });
        } else {
        await this.setState({ requireInputSDT: "" });
        }
    }

    if (
        this.state.requireInputDon === "" &&
        this.state.requireInputDen === "" &&
        this.state.requireInputSDT === ""
    ) {
        await self.initMap(
        document.getElementById("location-input-don").value,
        document.getElementById("location-input-den").value
        );
        //console.log("stateOK: " + self.state.existsRound);
    }

    //console.log("seeKC:", self.state.ArrayKhoangCach); 

}

GetAllDriver=()=>{
    var self=this
    Axios.get('http://localhost:8080/taixe')
  .then(function (res) {
    // handle success
    // console.log(res.data.taixe)
    let arrTemp=[];
    res.data.taixe.map(item=>{
        if(item.HoatDong==="Online"){
            arrTemp.push(item);
        }
    })
    //let taixes= res.data.taixe;
    self.setState({
        ArrayDriver:arrTemp
    })
     
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

    
}

handleSubmitFindDriver = () => {
    
    console.log("ComponentUpdate:", this.state.ArrayKhoangCach); 

    let noidon = document.getElementById("location-input-don").value
    let noiden = document.getElementById("location-input-den").value
    let sodienthoai = document.getElementById("input-sdt").value
    let giatien = document.getElementById("output-tien").textContent
    let sokm = document.getElementById("output-km").textContent
    let ArrKC = this.state.ArrayKhoangCach
    this.setState({ submitDriver: true  });
    let ArrDriver = this.state.ArrayDriver
    let thongtinchuyendi = {
        ArrDriver,
        ArrKC,
        thongTinKhach:{
            noidon,
            noiden,
            sodienthoai,
            giatien,
            sokm
        }
    }

    if(ArrDriver.length > 0){
        //dua sdt vao localstore
        localStorage.setItem("sodienthoaiKH", sodienthoai)
        //chuyen du lieu den app.js ->
        socket.emit("nhan-thong-tin-dat-ve", thongtinchuyendi)
    }
    
    
}

ValidateUSPhoneNumber(phoneNumber) {
    var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
        return true;
    }
    return false;
}

handleCancel = (event) => {
    event.preventDefault();
    this.setState({ existsRound: false });
    document.getElementById("location-input-don").value = "";
    document.getElementById("location-input-den").value = "";
    document.getElementById("output-km").textContent = "0 km";
    document.getElementById("output-tien").textContent = "0 đ";
    //directionsDisplay.setDirections({ routes: [] });
    this.initMap();
};



render() {
    return (
        <div id="book">
            <div className="container-fluid ct-book">
                <div className="row r-book">
                    <div className="col-12 map" id="myMap">
                        <div style={{ width: `100%`, height: `100%` }} >
                        </div>
                    </div>
                    {/* map */}
                </div>
            </div>
            <div className="bookCustomer" id="bookCustomer">
                <form onSubmit={this.handleSubmit}>
                <h4 className="titleBook">Thông tin khách hàng</h4>
                <small style={{ color: "yellow" }}>
                    <i>
                        {this.state.requireInputDon !== ""
                            ? this.state.requireInputDon
                            : ""}
                    </i>
                </small>
                <div className="form-group location-input">
                    <input
                        ref="inputDon"
                        type="text"
                        name="DiemDon"
                        id="location-input-don"
                        className="form-control"
                        placeholder="Địa điểm đón"
                        aria-describedby="helpId"
                    />
                </div>
                <small style={{ color: "yellow" }}>
                    <i>
                        {this.state.requireInputDen !== ""
                            ? this.state.requireInputDen
                            : ""}
                    </i>
                </small>
                <div className="form-group location-input">
                    <input
                        ref="inputDen"
                        type="text"
                        name="DiemDen"
                        id="location-input-den"
                        className="form-control"
                        placeholder="Địa điểm đến"
                        aria-describedby="helpId"
                    />
                </div>
                <small style={{ color: "yellow" }}>
                    <i>
                        {this.state.requireInputSDT !== ""
                            ? this.state.requireInputSDT
                            : ""}
                    </i>
                </small>
                <div className="form-group">
                    <input
                        onChange={this.handleInputChange}
                        ref="inputSDT"
                        type="number"
                        name="SDT"
                        id="input-sdt"
                        className="form-control"
                        placeholder="Số điện thoại"
                        aria-describedby="helpId"
                    />
                </div>
                <div className="form-group text-center">
                    <p style={{ color: "yellow", fontWeight: "bold" }}>
                        Số km dự tính :{" "}
                        <span id="output-km" style={{ fontSize: "18px" }}>
                            {this.state.soKM}0 km
                        </span>
                    </p>
                </div>
                <div className="form-group text-center">
                    <p style={{ color: "yellow", fontWeight: "bold" }}>
                        Số tiền dự tính :{" "}
                        <span
                            id="output-tien"
                            style={{ fontSize: "18px" }}
                        >
                            0 đ
                        </span>
                    </p>
                </div>

                {this.state.existsRound === false ? (
                    <div className="form-group text-center">
                        <button
                            name=""
                            className="btn btn-success btnRegister btn-block"
                            type="submit"
                        >
                            Xem Lộ Trình &nbsp;&nbsp;
                            <i className="fas fa-motorcycle" />
                        </button>{" "}
                    </div>
                ) : (
                    <div className="form-group text-center">
                        <button
                            onClick={this.handleCancel}
                            name=""
                            className="btn btn-danger btnCancel"
                        >
                            Huỷ &nbsp;&nbsp;
                            <i className="fas fa-motorcycle" />
                        </button>{" "}
                        &nbsp;{" "}
                        {this.state.submitDriver === false? <button
                            onClick={this.handleSubmitFindDriver}
                            name=""
                            className="btn btn-success btnFindDriver"
                        >
                            Đặt xe &nbsp;&nbsp;
                            <i className="fas fa-motorcycle" />
                        </button> : ""}
                        
                    </div>
                )}
                {/* bookCustomer */}
                </form>
            </div>

            <div className="btnShowHideForm" id="btnShowHideForm" data-toggle="tooltip" title="Đặt xe!">
                <i className="fas fa-eye"></i>
            </div>
        </div>
    );
}


initMap = (nameDon = "", nameDen = "") => {
    var markerArray = [];
    // Instantiate a directions service.
    var directionsService = new window.google.maps.DirectionsService();

    // Create a map and center it on Manhattan.
    map = new window.google.maps.Map(document.getElementById("myMap"), {
        zoom: 13,
        center: { lat: 10.762622, lng: 106.660172 }
    });

    // Create a renderer for directions and bind it to the map.
    directionsDisplay = new window.google.maps.DirectionsRenderer({
        map: map
    });

    // Instantiate an info window to hold step text.
    var stepDisplay = new window.google.maps.InfoWindow();
    if (directionsDisplay !== null && nameDon !== "") {
        this.calculateAndDisplayRouteProps(
        directionsDisplay,
        directionsService,
        markerArray,
        stepDisplay,
        map,
        nameDon,
        nameDen
        );
    }
};



TinhKhoangCach=async(nameDon,ToaDoTX)=>{
    var self=this;
    let sss=null;
    var request = {
        origin: nameDon,
        destination: new window.google.maps.LatLng(ToaDoTX.lat, ToaDoTX.lng),
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC
    };

    var directionsService = new window.google.maps.DirectionsService();
    await directionsService.route(request, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        
        if (status === "OK") {
            arrayTemp.push(response.routes[0].legs[0].distance.value);
            //document.getElementById("output-km").textContent = soKmT;
            //them khoang cahc vao mang
            //arrayTemp.push(soKmT);
            //console.log("SOK",arrayTemp.length);
            self.setState({
                ArrayKhoangCach:arrayTemp
            })
           //console.log("Mang",arrayTemp)

        } 
    })
}

calculateAndDisplayRouteProps = async (
    directionsDisplay,
    directionsService,
    markerArray,
    stepDisplay,
    map,
    nameDon = "",
    nameDen = ""
) => {
    // First, remove any existing markers from the map.
    //console.log('value:',nameDon)
    //console.log('value2:',nameDen)
    var self = this;
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    var request = {
        origin: nameDon,
        destination: nameDen,
        travelMode: "DRIVING",
        unitSystem: window.google.maps.UnitSystem.METRIC
    };

    directionsService.route(request, async function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.

        if (status === "OK") {
            await self.setState({ existsRound: true });
            //document.getElementById('warnings-panel').innerHTML ='<b>' + response.routes[0].warnings + '</b>';
            var soKmT = response.routes[0].legs[0].distance.text;
            document.getElementById("output-km").textContent = soKmT;
            //xử lý tiền
            var temp = response.routes[0].legs[0].distance.value;
            var soKM = (temp / 1000).toFixed(1);
            var tien = soKM * 2000;
            //var tien=parseFloat(soKm).toFixed(2);
            document.getElementById("output-tien").textContent = tien + " đ";

            await directionsDisplay.setDirections(response);
            //ShowStep
            await self.showSteps(response, markerArray, stepDisplay, map);

            //vòng tròn thần thánh
            var slat = response.routes[0].legs[0].start_location.lat();
            var slng = response.routes[0].legs[0].start_location.lng();
            var cityCircle = new window.google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: map,
                center: { lat: slat, lng: slng },
                radius: 2500
            });
            
            
            self.state.ArrayDriver.map(async (item)=>{
                await self.TinhKhoangCach(nameDon,item.ToaDoHienTai).value
             })
            
        } else {
        /* document.getElementById("location-input-don").value = "";
    document.getElementById("location-input-den").value = ""; */
        document.getElementById("output-km").textContent = "0 km";
        document.getElementById("output-tien").textContent = "0 đ";
        directionsDisplay.setDirections({ routes: [] });
        //window.alert('Directions request failed due to ' + status);
        }
    });
};

showSteps = (directionResult, markerArray, stepDisplay, map) => {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    //console.log(myRoute.steps[0].start_location);
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = (markerArray[i] =
        markerArray[i] || new window.google.maps.Marker());
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);

        this.attachInstructionText(
        stepDisplay,
        marker,
        myRoute.steps[i].instructions,
        map
        );
    }
    //console.log(arrayPos);
};

attachInstructionText = (stepDisplay, marker, text, map) => {
    window.google.maps.event.addListener(marker, "click", function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
};

}

export default withRouter(Blook)




