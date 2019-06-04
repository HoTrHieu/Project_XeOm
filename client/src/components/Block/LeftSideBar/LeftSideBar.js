import React, { Component } from 'react';
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class LeftSideBar extends Component {
    getRole(){
        if(localStorage.getItem('taikhoan')){
            const token = localStorage.getItem('taikhoan');
            const decoded = jwt_decode(token);
            console.log(decoded);
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
                <li className="parent ">
                    <i className="fas fa-user" />
                    &nbsp;Danh Sách Bác Tài
                </li>
                </Link>
                <a href>
                <li className="parent ">
                    <i className="fas fa-chart-bar" />
                    &nbsp;Thống Kê
                </li>
                </a>
                <ul className="subMenu">
                <a href> </a>
                <Link to="alldrivers">
                    <li>
                        <i className="far fa-dot-circle" />
                        &nbsp;Tất Cả Bác Tài
                    </li>
                </Link>
                <Link to="driver">
                    <li>
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
                <div className="wrapperAvtSideBar">
                    <img
                    src="./templates/users/lib/images/image002_2.jpg"
                    alt=""
                    className="img-fluid avatarSideBar"
                    />
                </div>
                {role==='admin'?adminLink:driverLink}
            </div>
        );
    }
}

export default LeftSideBar;