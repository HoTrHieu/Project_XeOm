 
    import React, { Component } from "react";
    import socketIOClient from "socket.io-client"
    import { withRouter} from "react-router-dom"
    import jwt from "jwt-decode"
    
    var socket
    var numDeltas = 100;
    var delay = 100; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;
    var position = []//set điểm bắt đầu
    var map;
    //var MymarkerArray = [];
    var marker;
    class Confirm extends Component {
        constructor(props){
            super(props)
                this.state = {
                    point: "http://localhost:8080/",
                    data : {},
                    noidon: '', 
                    noiden: '',
                    sodienthoai:'',
                    sokm: '',
                    giatien:'',
                    DiemA:{lat:10.773595,lng: 106.694417},
                    DiemB:{lat:10.762987,lng: 106.682150},
                    TaiXe:{lat: 10.779691, lng: 106.699073},
                    WayPointT:[],
                    WayPointK:[],
                    sdt: ""
                }
                socket = socketIOClient(this.state.point)
            }
            getData = (data) =>{
                let tem=data.ThongTinKhach
                let sodienthoai = data.SDT
                this.setState({
                    data:tem,
                    sdt: sodienthoai
                })
            }
    //     componentDidMount(){
           
         
    //   }
      // socket_NhanKhach
      socket = ()=>{
          
      }
      onChange = (e) =>{
          this.setState({ [e.target.name]: e.target.value })
      }
      handleSubmitUnRecieve = ()=>{
          let username  = jwt(localStorage.getItem("taikhoan")).UserName
          socket.emit("taixe-huy-chuyen", username)
      }
      handleSubmitRecieve = ()=>{
          // truyen thong tin chuyen di
          const {giatien, noidon, noiden, sodienthoai, sokm } = this.state.data
          //sodienthoaikhach, sodienthoaitaixe, noidon, noidi, sdt, sotien,tinhtrang
          let phonedriver  = jwt(localStorage.getItem("taikhoan")).UserName
          
           let chuyendi = {
                sodienthoai,
                phonedriver,
                noidon,
                noiden,
                sokm,
                giatien,
                tinhtrang:"NhanKhach"
           }
          let xacnhan = {
              sodienthoai, phonedriver
          }
           //chay den trang route 
            //sau do gui thong tin tài xe qua khach hang bang trang find
              socket.emit("chay-den-tai-xe-xac-nhan", xacnhan) //nguoi dung
              socket.emit("chay-den-trang-route", chuyendi )
      }
//<<<<<<< Updated upstream


 

    initMap = async(nameDon='',nameDen='')=> {
        var self =this;
        //console.log("LenMap")
        
        // Instantiate a directions service.
        var directionsService = new window.google.maps.DirectionsService;
    
        // Create a map and center it on Manhattan.
        map = new window.google.maps.Map(document.getElementById('myMap'), {
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
                
            
            await this.calculateAndDisplayRouteProps(directionsDisplay, directionsService, stepDisplay, map,self.state.TaiXe,self.state.DiemA,icons);
            await this.calculateAndDisplayRouteProps(directionsDisplay2, directionsService, stepDisplay, map,self.state.DiemA,self.state.DiemB);
        }
        map.setCenter(self.state.TaiXe);
    }
    
    calculateAndDisplayRouteProps=async(directionsDisplay, directionsService, stepDisplay, map,DiemA,DiemB,icons=null)=>{  
        var self= this;  
        var markerArray=[]
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
                    marker= self.makeMarker(leg.start_location,icons,"H1",map)
                    //console.log("setMarket",mar)
                    //markerArray
                    await self.GetWayPoint(response,markerArray)
                    self.setState({
                        //MTaiXe:mar,
                        WayPointT:markerArray
                    })
                }
                else{
                    await self.GetWayPoint(response,markerArray);
                    self.setState({
                        WayPointK:markerArray
                    })
                }
            } else {
                console.log("khong lay duoc way point")
                    //window.alert('Directions request failed due to ' + status);
            }
            
        });
    
    }
    

    showSteps=async(directionResult, stepDisplay, map,icon=null)=>{
        

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

            WayPoint[i]={lat:myRoute.steps[i].start_location.lat(),lng:myRoute.steps[i].start_location.lng()};
            //console.log("myPsiong",myRoute.steps[i].start_location.lat())
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
    
    async MoveMoTo(next,i){
        var self=next;
        //var index=0
        //(self.WayPointT || []).map(temp=>(console.log(temp)));
        //console.log(self.WayPoint.length)
        //console.log(x)
        //var i=0;
        //console.log(self.WayPointT[0].lat)
        //var i=0
        //await self.state.MTaiXe.setPosition(self.state.WayPointT[i].lat,self.state.WayPointT[i].lng)
        //i++;
        //setTimeout((i)=>this.MoveMoTo(i), 1000);
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
    handleMove=async(arrayT,a)=>{
        var self= this;     
        

        //console.log("xuat",arrayT)
        //console.log("a:",a)

        if(a===arrayT.length-1){
            console.log("end:",a)
            return;
        }
        if(a===0){
            console.log(arrayT)
            var latlng={lat:arrayT[0].lat,lng:arrayT[0].lng};
            //set lại biến position
            position[0]=latlng.lat;
            position[1]=latlng.lng;
            marker.setTitle("Latitude:"+latlng.lat +" | Longitude:"+latlng.lng)
        }
        
            a=a+1 
            var result={lat:arrayT[a].lat,lng:arrayT[a].lng};
            return self.transition(result,arrayT,a)         
            
        
                               
               
            
            
        
    }
    transition(result,arrayT,a){        
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
        return this.moveMarker(arrayT,a);
    }
    
    moveMarker=(arrayT,a)=>{
        var self=this;
        position[0] += deltaLat;
        position[1] += deltaLng;
        var latlng = new window.google.maps.LatLng(position[0], position[1]);
        
        marker.setTitle('new title');
        marker.setPosition(latlng);
        
        if(i !== numDeltas){
            i++;
            //console.log("XuatA:",a);
            setTimeout(()=>this.moveMarker(arrayT,a), 10);
        }
        else{
            //console.log("aMo",a)
            self.handleMove(arrayT,a)
        }
    }
    MerArray(arrayT,arrayK,DiemB){
        var index=arrayT.length;
        var arrayMer=arrayT;
        for(var i=0;i<arrayK.length;i++){
            arrayMer[index++]=arrayK[i]
        }
        arrayMer[index++]=DiemB;
        return arrayMer;
    }

    componentWillMount(){
        if (!localStorage.getItem("taikhoan")) {
            console.log("khong ton tai tai khoan")
            
          } else {
              if(jwt(localStorage.getItem("taikhoan")).LoaiTaiKhoan === "TaiXe"){
                socket.on("thong-tin-dat",  this.getData)
                  
            }
        }
    }
    async componentDidMount() {
       
        await this.initMap();
        // if (!localStorage.getItem("taikhoan")) {
        //     console.log("khong ton tai tai khoan")
            
        //   } else {
        //       if(jwt(localStorage.getItem("taikhoan")).UserName === this.state.sodienthoai){
               
                  
        //     }
        // }
        //console.log("Waipointl 2:",this.state.WayPointK)
        //console.log("Waipointl 1:",this.state.WayPointT)
        //console.log("ma",this.state.MTaiXe)

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
    shouldComponentUpdate(nextProps, nextState) {
        //console.log('ShowMaker',nextState.MTaiXe)
        //console.log("shouldComponentUpdate:",nextState.WayPointK)
        //console.log("shouldComponentUpdate:",nextState.WayPointT)
        return true;
    }
    async componentWillUpdate(nextProps, nextState) {
        //if(nextState.WayPointK.length!==0 && nextState.MTaiXe.getPosition().lat() === nextState.WayPointT[0].lat){
        //    this.MoveMoTo(nextState);
        //}
        // console.log("arrayT",nextState.WayPointT);
        // console.log("arrayK",nextState.WayPointK);

        var self=this;
        if(nextState.WayPointK.length!==0){
            var a=0
            var arrayTemp=await self.MerArray(nextState.WayPointT,nextState.WayPointK,nextState.DiemB)
            console.log("arrayM",arrayTemp);

            self.handleMove(arrayTemp,a)
        }
    }
    
    
render() {
    console.log("data nek",this.state.data)
    const {giatien, noidon, noiden, sodienthoai, sokm } = this.state.data
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

            
            <div className=" col-xs-12 col-md-4 bookCustomer confirmDriver" id="bookCustomer">
                <h4 className="titleBook" style={{ color: "#fff" }}>
                    Thông tin khách hàng
                </h4>
                <div className="form-group">
                    <input
 
                    type="text"
                    value = {noidon}
                    name = "noidon"
                    id
                    className="form-control"
                    placeholder="Địa điểm đón"
                    aria-describedby="helpId"
                    onChange = {this.onChange}
                    readOnly
                    
 
                    />
                </div>
                <div className="form-group"> 
                    <input
 
                     
                    value = {noiden}
                    name = "noiden"
                    type="text"
                    
                     
                    id
                    className="form-control"
                    placeholder="Địa điểm đến"
                    aria-describedby="helpId"
                    onChange = {this.onChange}
                    readOnly
 
                    />
                </div>
                <div className="form-group">
                    <input
 
                    value = {sodienthoai}
                    name = "sodienthoai"
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Số điện thoại"
                    aria-describedby="helpId"
                    onChange = {this.onChange}
                    readOnly

                    />
                </div>
                <div className="form-group">
                    <input
 
                     value = {sokm}
                     name = "sokm"
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder= "Số km dự tính : 15km"
                    aria-describedby="helpId"
                    onChange = {this.onChange}
                    readOnly
 
                    />
                </div>
                <div className="form-group">
                    <input
 
                    value = {giatien}
                    name = "giatien"
                    type="text"
                    name
                    id
                    className="form-control"
                    
                    aria-describedby="helpId"
                    onChange = {this.onChange}
                    readOnly
 
                    />
                </div>
                <div className="form-group text-right">
                    <div className="row">
                        <div className="col-6">
                        <button
 
                        type="button"
                        name
                        id
                        className="btn btn-success btn-block btnRegister btn-danger"
                        onClick = {this.handleSubmitUnRecieve}
                        >
                        Không Nhận &nbsp;
                        <i className="far fa-times-circle" />
                        

                        </button>
                        </div>
                        <div className="col-6">
                        <button
 
                            type="button"
                            className="btn btn-success btn-block btnRegister btn-block"
 
                        name
                        id
   
                        onClick = {this.handleSubmitRecieve}
 
                        >
                            Nhận Chuyến&nbsp;
                            <i className="far fa-check-circle" />
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnShowHideForm btnShowHideFormConfirm" id="btnShowHideForm" data-toggle="tooltip" title="Đặt xe!">
                <i className="fas fa-eye"></i>
            </div>
        </div>
    );
}
}

export default Confirm;
