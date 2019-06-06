import React, { Component } from 'react';
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
/* import axios from 'axios' */

class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taixe: [],
            UserName: ""
        };
    }
    getRole(){
        if(localStorage.getItem('taikhoan')){
            const token = localStorage.getItem('taikhoan');
            const decoded = jwt_decode(token);
            const role = decoded.LoaiTaiKhoan;
            return role
        }
    }
    render() {
        const role = this.getRole();
        const driverLink = (
            <ul>
                <Link to="/profile">
                    <li>
                        <i className="fas fa-user" />
                        &nbsp;<span>Thông tin</span>
                        <div>Thông tin</div>
                    </li>
                </Link>
                <Link to="/statistical">
                    <li>
                        <i className="fas fa-chart-bar" />
                        &nbsp;<span> Thống kê</span>
                        <div>Thống kê</div>
                    </li>
                </Link>
            </ul>
        );
        const adminLink = (
            <ul className="menuParent">
                <Link to="/index-admin">
                <li className={this.props.active === 'index'? "active parent": "parent"}>
                    <i className="fas fa-user" />
                    &nbsp;Danh Sách Bác Tài
                </li>
                </Link>
                <Link to="alldrivers">
                <li className="parent ">
                    <i className="fas fa-chart-bar" />
                    &nbsp;Thống Kê
                </li>
                </Link>
                <ul className="subMenu">
                <Link to="alldrivers">
                    <li className={this.props.active === 'alldriver'? "active parent": "parent"}>
                        <i className="far fa-dot-circle" />
                        &nbsp;Tất Cả Bác Tài
                    </li>
                </Link>
                <Link to="driver">
                    <li  className={this.props.active === 'driver'? "active parent": "parent"}>
                        <i className="far fa-dot-circle" />
                        &nbsp;Từng Bác Tài
                    </li>
                </Link>
                </ul>
            </ul>
        );
        return (
            <div className="col-sm-3 d-none d-sm-block" id="sideBar">
                <p className="text-center">{role==='admin'?'Xin chào Admin':'Xin chào Bác Tài'}</p>
                {role==='admin'?'':<div className="wrapperAvtSideBar">
                    <img
                    src={this.props.anhDaiDien}
                    alt=""
                    className="img-fluid avatarSideBar"
                    />
                </div>}
                {role==='admin'?adminLink:driverLink}
            </div>
        );
    }
}

export default LeftSideBar;