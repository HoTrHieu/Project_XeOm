import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class SideBarMobile extends Component {
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
            <div className="row">
                <div className="col-6">
                    <ul>
                    <Link to="/profile">
                        <li
                            className={
                                this.props.active === "profile"
                                ? "active parent"
                                : "parent"
                            }
                        >
                            <i className="fas fa-users"></i>
                            <div>
                                Thông Tin
                            </div>
                        </li>
                    </Link>
                    </ul>
                </div>
                <div className="col-6">
                    <ul>
                    <Link to="statistical">
                        <li
                            className={
                                this.props.active === "statistical"
                                ? "active parent"
                                : "parent"
                            }
                        >
                            <i className="fas fa-chart-bar"></i>
                            <div>
                                Thống Kê
                            </div>
                        </li>
                    </Link>
                    </ul>
                </div>
            </div>
    );
    const adminLink = (
            <div className="row">
                <div className="col-4">
                    <ul>
                    <Link to="/index-admin">
                        <li
                            className={
                                this.props.active === "index"
                                ? "active parent"
                                : "parent"
                            }
                        >
                            <i className="fas fa-users"></i>
                            <div>
                                Danh Sách <br /> Bác Tài
                            </div>
                        </li>
                    </Link>
                    </ul>
                </div>
                <div className="col-4">
                    <ul>
                    <Link to="alldrivers">
                        <li
                            className={
                                this.props.active === "alldriver"
                                ? "active parent"
                                : "parent"
                            }
                        >
                            <i className="fas fa-chart-bar"></i>
                            <div>
                                Thống Kê <br /> Tất Cả Bác Tài
                            </div>
                        </li>
                    </Link>
                    </ul>
                </div>
                <div className="col-4">
                    <ul>
                    <Link to="driver">
                        <li
                            className={
                                this.props.active === "driver"
                                ? "active parent"
                                : "parent"
                            }
                        >
                            <i className="fas fa-chart-bar"></i>
                            <div>
                                Thống Kê <br /> Từng Bác Tài
                            </div>
                        </li>
                    </Link>
                    </ul>
                </div>
            </div>
    )
    return (
        <div className="container-fluid" id="sideBarSub">
            {role === 'admin'?adminLink:driverLink}
        </div>
    );
}
}

export default SideBarMobile;
