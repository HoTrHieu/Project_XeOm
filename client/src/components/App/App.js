//import React from 'react';
import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import axios from "axios";

class App extends Component {
  componentDidMount() {
    /* axios.get('/api/helloworld')
.then(result => this.setState({greeting: result.data.sayHi})); */
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
    return (
        <Router>
          <Route exact path="/" component={Index} />
          <Route exact path="/book" component={BookPage} />
          <Route exact path="/login" component={Login} />
          <Route
              exact
              path="/profile"
              component={
                localStorage.taikhoan && this.getRole() === "TaiXe"
                    ? Profile
                    : Index
              }
          />
          <Route exact path="/register" component={RegisterPage} />
          <Route
              exact
              path="/statistical"
              component={localStorage.taikhoan ? Statistical : Index}
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
              exact
              path="/alldrivers"
              component={
                localStorage.taikhoan && this.getRole() === "admin"
                    ? AllDrivers
                    : Index
              }
          />
          <Route
              exact
              path="/driver"
              component={
                localStorage.taikhoan && this.getRole() === "admin"
                    ? Driver
                    : Index
              }
          />
        </Router>
    );
  }
}

export default App;
