import React, { Component } from 'react';
/* import ReactDOM from 'react-dom'; */
import MyMap from '../MyMap/MyMap';
import axios from 'axios';


class Blook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DiemDon: '',
            DiemDen: '',
            SDT: '',
            latDon:10.773583, 
            lngDon:106.694368,
            latDen:10.762980, 
            lngDen:106.682179
        }
    }
    
    handleSubmit=()=>{
        
        //console.log(event);
        // var locationDon = ReactDOM.findDOMNode(this.refs.inputDon).value;
        // var locationDen = ReactDOM.findDOMNode(this.refs.inputDen).value;
        // this.setState({
        //     DiemDon: ReactDOM.findDOMNode(this.refs.inputDon)
        // })

        var self = this;

        axios({
            method:'get',
            url:'https://maps.googleapis.com/maps/api/geocode/json',
            params:{
                address:this.state.DiemDon,
                key:'AIzaSyDeHi_HvoFXqnJT4eCBrlDnOLktJLMjU0s'
              }
          })
        .then(function(response) {
            //console.log(response);
            self.setState({
                //         DiemDon: response.data.results[0],
                latDon: response.data.results[0].geometry.location.lat,
                lngDon: response.data.results[0].geometry.location.lng
                
            })

        }).catch(function (error) {
            console.log(error);
        });
        
        axios({
            method:'get',
            url:'https://maps.googleapis.com/maps/api/geocode/json',
            params:{
                address:this.state.DiemDen,
                key:'AIzaSyDeHi_HvoFXqnJT4eCBrlDnOLktJLMjU0s'
              }
          })
        .then(function(response) {
            //console.log(response);
            self.setState({
                //         DiemDon: response.data.results[0],
                latDen: response.data.results[0].geometry.location.lat,
                lngDen: response.data.results[0].geometry.location.lng
                
            })

        }).catch(function (error) {
            console.log(error);
        });
        
    }
    
    handleInputChange = (event) =>{
        //event.preventDefault();
         this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        
        // return true;
        //console.log("showldcomponentUpdate");
        return true;
    }
    
    componentWillUpdate(nextProps, nextState) {
        /* var self = this; */
        //console.log(nextState)
        

    }
     componentDidUpdate(prevProps, prevState) {
        console.log(prevState)
     }
     

    render() {       
        return (            
            <div id="book">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-md-8 map">
                            {/* <MyMap DiemDon={this.state.DiemDon} DiemDen={this.state.DiemDen}></MyMap> */}
                            <MyMap
                                id="myMap"
                                latDon={this.state.latDon} lngDon={this.state.lngDon} latDen={this.state.latDen} lngDen={this.state.lngDen}
                            >

                            </MyMap>
                                
                                                       
                        </div>
                        {/* map */}
                        <div className=" col-xs-12 col-md-4 bookCustomer">
                            
                                <h4 className="titleBook">Thông tin khách hàng</h4>
                                <div className="form-group">
                                    <input onChange={this.handleInputChange} ref="inputDon" type="text" name="DiemDon" id="location-input-don" className="form-control" placeholder="Địa điểm đón" aria-describedby="helpId" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleInputChange} ref="inputDen" type="text" name="DiemDen" id="location-input-den" className="form-control" placeholder="Địa điểm đến" aria-describedby="helpId" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.handleInputChange} ref="inputSDT" type="text" name="SDT" id="" className="form-control" placeholder="Số điện thoại" aria-describedby="helpId" />
                                </div>
                                <div className="form-group text-center">
                                    <p style={{color: 'red', fontWeight:'bold'}}>Số km dự tính : <span style={{fontSize:'18px'}}>15km</span></p>
                                </div>
                                <div className="form-group text-center">
                                    <p style={{color: 'red', fontWeight:'bold'}}>Số tiền dự tính : <span style={{fontSize:'18px'}}>30.000đ</span></p>
                                </div>
                                <div className="form-group text-right">
                                    <button onClick={this.handleSubmit} name="" className="btn btn-success btnRegister btn-block">
                                        Tìm Tài Xế &nbsp;&nbsp;<i className="fas fa-motorcycle" />
                                    </button>
                                </div>                        
                           
                            
                        {/* bookCustomer */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Blook;