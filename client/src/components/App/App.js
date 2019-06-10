//import React from 'react';
import React, { Component } from "react";

import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
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

import FindDriver from "../UserPage/FindDriver/FindDriver";
import ConfirmDriver from "../UserPage/ConfirmDriver/ConfirmDriver";

import RouteDriver from "../UserPage/RouteDriver/RouteDriver";
import { PrivateRouteAdmin } from "../PrivateRoute/PrivateAdmin"
import { PrivateRouteProfile } from "../PrivateRoute/PrivateRouteProFile"

import DashboardAdmin from "../Dashboard/DashboardAdmin"
import DashboardProfile from "../Dashboard/DashboardProfile"
import socketIOClient from "socket.io-client"

// var socket
var socket
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpont: "http://localhost:8080/",
      yes: true,
      no: false,
      link: '/confirm'
    }
    socket = socketIOClient(this.state.endpont)
  }

  componentDidMount() {

    console.log("localstorage", typeof localStorage.getItem("taikhoan"))
    if (!localStorage.getItem("taikhoan")) {
      // console.log("khong ton tai tai khoan")
      // socket.on("bat-dau-chuyen", data => {
      //   console.log("chap nhan dat thanh cong")
      // })
      if(!localStorage.getItem("sodienthoaiKH")){
        console.log("khach hang khong co dat chuyen")
      }else{
            socket.on("truyen-den-trang-tai-xe-xac-nhan", data=>{
              console.log("sodienthoaikhachhang",localStorage.getItem("sodienthoaiKH"))
              if(localStorage.getItem("sodienthoaiKH") === data.sdtKhach){
                
               
                   this.props.history.push("/find")    
                   
                   setTimeout(() => {
                    // setInterval(() => {
                      socket.emit("gui-thong-tin-tai-xe", data )
                    // }, 1000);
                   }, 500);
                
                    
              }
             
            })

            
          
      }
    } else {
      let LoaiTaiKhoan = jwt_decode(localStorage.getItem("taikhoan")).UserName
      // if(localStorage.getItem("taikhoan"))
      // console.log(LoaiTaiKhoan)
      // socket.emit("tai-xe-online", LoaiTaiKhoan)
      socket.emit("tai-xe-online", LoaiTaiKhoan)
      socket.on("list-tai-online", (data) => {
        console.log(data)
      })
      socket.on("co-nguoi-dat-ve", data => {
        if(data.SDT === LoaiTaiKhoan){
          socket.emit("confirm-ne", data)
          const link = `/confirm`
          this.props.history.push(link)
         
     
        }
        console.log("hey man ", data)
        //chuyển du lieu len sover
        
        //để nhảy đến trang confirm
       

        // let chapnhandat = this.state.yes
        // socket.emit("chap-nhan-dat-ve", chapnhandat )

      })
      socket.on("tai-xe-load-route", data=>{
        if(jwt_decode(localStorage.getItem("taikhoan")).UserName === data.phonedriver){
          socket.emit("truyen-data-route", data)
          this.props.history.push("/router")
        }
       
      })
      //chap nhan dat ve
      // socket.on("truyen-den-trang-tai-xe-xac-nhan", data=>{
        
      //     socket.emit("truyen-den-trang-xac-nhan-khach-hang", data)
          
      // })


    }

   

  }

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

    console.log(this.state.link)

    // tai-xe-nhan-chuyendi-(ConfirmDriver)
    // khi 2 thang dong y (Router-Driver)
    //  khi ma thang khach hang dat chuyen (FindDriver)
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
          path="/find"
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
        <PrivateRouteAdmin path="/" component={DashboardAdmin} />
        <PrivateRouteProfile path="/" component={DashboardProfile} />
      </Switch>

    );
  }
}

export default withRouter(App);
