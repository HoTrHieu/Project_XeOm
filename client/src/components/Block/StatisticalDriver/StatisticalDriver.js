import React, { Component } from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Content from "./Content";
import SideBarMobile from "../LeftSideBar/SideBarMobile";

class StatisticalDriver extends Component {
constructor(props) {
    super(props);
    this.state = {
        taixe: [],
        username: ''
    };
}
componentWillMount() {
    const token = localStorage.getItem("taikhoan");
    const decoded = jwt_decode(token);
    const username = decoded.UserName;
    this.setState({ username: username });
    if (decoded.LoaiTaiKhoan === "TaiXe") {
        this.getData(username);
    }
}
getData = (id) => {
    const link = "http://localhost:8080/taixe/" + id;
    axios
        .get(link)
        .then((res) => {
        const taixe = res.data.taixe;
        this.setState({
            taixe: taixe
        });
        })
        .catch(function(error) {
        // handle error
        /* console.log(error); */
        })
        .finally(function() {
        // always executed
        });
};


render() {
    return (
        <div className="wrapperMain">
        <div className="container-fluid ct-f-sideBar">
            <div className="row r-sideBar">
                <LeftSideBar anhDaiDien={this.state.taixe.AnhDaiDien}   active="statistical"/>
                <SideBarMobile active="statistical"></SideBarMobile>
                <div className="col-xs-12 col-md-9 statistical" id="content">
                    <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="titleMain text-center">
                                        Thống Kê Cá Nhân
                                    </h2>
                                </div>
                            </div>
                        </div>
                    <Content username={this.state.username}></Content>
                </div>
            </div>
        </div>
        </div>
    );
}
}

export default StatisticalDriver;
