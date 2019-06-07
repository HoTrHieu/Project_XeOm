//import React from 'react';
import React, { Component } from "react";

import "./App.css";
import { Route,Switch } from "react-router-dom";
import Index from "../UserPage/Index/Index";
import Profile from "../UserPage/Profile/Profile";
import RegisterPage from "../UserPage/RegisterPage/RegisterPage";
import Statistical from "../UserPage/Statistical/Statistical";
import BookPage from "../UserPage/BookPage/BookPage";
import Login from "../UserPage/Login/Login";
import IndexAdmin from "../AdminPage/IndexAdmin/Index";
import AllDrivers from "../AdminPage/AllDrivers/AllDrivers";
import Driver from "../AdminPage/Driver/Driver";
import jwt_decode from "jwt-decode";
// import socketIOClient from "socket.io-client"
import FindDriver from "../UserPage/FindDriver/FindDriver";
import ConfirmDriver from "../UserPage/ConfirmDriver/ConfirmDriver";
import RouteDriver from "../UserPage/RouteDriver/RouteDriver";
import {PrivateRouteAdmin} from "../PrivateRoute/PrivateAdmin"
import {PrivateRouteProfile} from   "../PrivateRoute/PrivateRouteProFile"
import DashboardAdmin from "../Dashboard/DashboardAdmin"
import DashboardProfile from "../Dashboard/DashboardProfile"
// var socket
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     endpont: "http://localhost:8081/"
  //   }
  //   socket = socketIOClient(this.state.endpont)
  // }

  componentDidMount() {
    /* axios.get('/api/helloworld')
.then(result => this.setState({greeting: result.data.sayHi})); */
    // let chapnhan = "toi dang on line nek"
   
    // if (localStorage.getItem("taikhoan")) {
    //   const token = localStorage.getItem("taikhoan");
    //   const decoded = jwt_decode(token);
    //   socket.emit("tai-xe-online", decoded)
    //   socket.on("thong-bao-online", (data)=>{
    //     console.log(`client online ${data}`)
    //   })
    // }
  
  }
  /* getUser = () => {     
    if (localStorage.getItem("taikhoan")) {
      const token = localStorage.getItem("taikhoan");
      const decoded = jwt_decode(token);
      
    }
  } */
  getRole() {
    let role;
    if (localStorage.getItem("taikhoan")) {
      const token = localStorage.getItem("taikhoan");
      const decoded = jwt_decode(token);
      role = decoded.LoaiTaiKhoan;
    }
    return role;
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
       
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/book" component={BookPage} />
        <Route
          exact
          path="/profile"
          component={
            localStorage.taikhoan && this.getRole() === "admin"
              ? IndexAdmin
              : Profile
          }
        />
        <Route
          exact
          path="/statistical"
          component={
            localStorage.taikhoan && this.getRole() === "admin"
              ? IndexAdmin
              : Statistical
          }
        />
         <Route
         exact
          path="/index-admin"
          component={
            localStorage.taikhoan && this.getRole() === "admin"
              ? IndexAdmin
              : Index
          }
        />
        <Route
          path="/alldrivers"
          component={
            localStorage.taikhoan && this.getRole() === "admin"
              ? AllDrivers
              : Index
          }
        />
        <Route
          path="/driver"
          component={
            localStorage.taikhoan && this.getRole() === "admin"
              ? Driver
              : Index
          }
        /> 
        <Route
          path="/finddriver"
          component={
            FindDriver
          }
        /> 
         <Route
          path="/confirm"
          component={
            ConfirmDriver
          }
        /> 
         <Route
          path="/router"
          component={
            RouteDriver
          }
          /> 
        <PrivateRouteAdmin path="/" component={DashboardAdmin}/>
        <PrivateRouteProfile path="/" component ={DashboardProfile}/>
     </Switch>
    );
  }
}

export default App;
