import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import LeftSideBar from "../LeftSideBar/LeftSideBar";

class ProfileDriver extends Component {
constructor(props) {
    super(props);
    this.state = {
        taixe: {},
        UserName: ""
    };
}

componentWillMount() {
    const token = localStorage.getItem("taikhoan");
    const decoded = jwt_decode(token);
    const username = decoded.UserName;
    console.log(decoded);
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
        console.log(error);
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
                <LeftSideBar />
                {/* sideBar */}
                <div className="col-xs-12 col-sm-9" id="content">
                    <div className="container-fluid" id="sideBarSub">
                    <div className="row">
                        <div className="col-6 d-block d-sm-none">
                            <ul>
                                <a href="profile.html">
                                <li className="active">
                                    <i className="fas fa-user" />
                                    <div>Thông tin</div>
                                </li>
                                </a>
                            </ul>
                        </div>
                        <div className="col-6 d-block d-sm-none">
                            <ul>
                                <a href="statistical.html">
                                <li>
                                    <i className="fas fa-chart-bar" />
                                    <div>Thống kê</div>
                                </li>
                                </a>
                            </ul>
                        </div>
                    </div>{" "}
                    {/* row */}
                    </div>{" "}
                    {/* sideBarSub */}
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <div className="col-12 wrapperImgProfileContent">
                                <label htmlFor="true">Ảnh đại diện</label>{" "}
                                <br />
                                <img
                                src="./templates/users/lib/images/image002_2.jpg"
                                alt=""
                                className="img-fluid imgProfileContent"
                                />
                                <div className="inputFile">
                                <label id="#bb">
                                    {" "}
                                    Đổi ảnh đại diện bác tài
                                    <input
                                        type="file"
                                        id="File"
                                        className="form-control-file inputFile"
                                        name="true"
                                        placeholder="true"
                                        aria-describedby="fileHelpId"
                                    />
                                </label>
                                </div>
                            </div>{" "}
                            {/* wrapperImgProfileContent */}
                            <div className="col-12 wrapperImgProfileContent">
                                <label htmlFor="true">Ảnh xe</label> <br />
                                <img
                                src="./templates/users/lib/images/Gia-xe-Honda-Vision-thang-5-9-1525418495-315-width500height391.jpg"
                                alt=""
                                className="img-fluid imgProfileContent"
                                />
                                <div className="inputFile">
                                <label id="#bb">
                                    {" "}
                                    Đổi ảnh xe
                                    <input
                                        type="file"
                                        id="File"
                                        className="form-control-file inputFile"
                                        name="true"
                                        placeholder="true"
                                        aria-describedby="fileHelpId"
                                    />
                                </label>
                                </div>
                            </div>{" "}
                            {/* wrapperImgProfileContent */}
                        </div>

                        <div className="col-xs-12 col-sm-8">
                            <div className="col-12">
                                <div className="form-group">
                                <label htmlFor="true">Họ và Tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ và tên đệm"
                                    defaultValue={this.state.taixe.HoTen}
                                />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                <label htmlFor="true">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    defaultValue={
                                        this.state.taixe.SoDienThoai
                                    }
                                />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                <label htmlFor="true">Biển số xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Biển số xe"
                                    defaultValue={this.state.taixe.BienSoXe}
                                />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                <label htmlFor="true">Địa Chỉ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={this.state.taixe.DiaChi}
                                />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-success btnRegister btn-block"
                                >
                                    Lưu Thay Đổi
                                </button>
                                </div>
                            </div>{" "}
                        </div>
                    </div>
                    </div>{" "}
                    {/* content */}
                </div>
            </div>
        </div>{" "}
        {/* wrapperMain */}
        </div>
    );
}
}

export default ProfileDriver;
