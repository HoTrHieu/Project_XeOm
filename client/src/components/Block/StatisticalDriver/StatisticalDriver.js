import React, { Component } from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";

class StatisticalDriver extends Component {
render() {
    return (
        <div className="wrapperMain">
        <div className="container-fluid ct-f-sideBar">
            <div className="row r-sideBar">
                <LeftSideBar></LeftSideBar>
                {/* sideBar */}
                <div className="col-xs-12 col-sm-9 statistical" id="content">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="titleMain text-center">
                                Thống Kê Cá Nhân
                            </h2>
                        </div>
                    </div>
                    </div>
                    <div className="container-fluid" id="sideBarSub">
                    <div className="row">
                        <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="profile.html">
                                <li>
                                    <i className="fas fa-user" />
                                    <div>Thông tin</div>
                                </li>
                                </a>
                            </ul>
                        </div>
                        <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="statistical.html">
                                <li className="active">
                                    <i className="fas fa-chart-bar" />
                                    <div>Thống kê</div>
                                </li>
                                </a>
                            </ul>
                        </div>
                        <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="/">
                                <li>
                                    <i className="fas fa-sign-out-alt" />
                                    <div>Đăng xuất</div>
                                </li>
                                </a>
                            </ul>
                        </div>
                    </div>{" "}
                    {/* row */}
                    </div>{" "}
                    {/* sideBarSub */}
                    <div className="byDay">
                    <span className="titleBy">
                        <i className="fas fa-coins" />
                        &nbsp;Thống kê theo ngày
                    </span>
                    <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-04-05"
                        id="example-date-input"
                    />
                    <div className="container">
                        <div className="row text-center wrapperRow">
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-road" />
                                <p>Tổng Số Km</p>
                                <h3>
                                    <b>95km</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-motorcycle" />
                                <p>Tổng Số Cuốc</p>
                                <h3>
                                    <b>5</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 text-center">
                                <div className="wrapperBlock">
                                <i className="fas fa-money-check-alt" />
                                <p>Tổng Số Tiền</p>
                                <h3>
                                    <b>780.000đ</b>
                                </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>{" "}
                    {/* byDay */}
                    <div className="byWeek">
                    <span className="titleBy">
                        <i className="fas fa-coins" />
                        &nbsp;Thống kê theo tuần
                    </span>
                    <div className="container">
                        <div className="row text-center wrapperRow">
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-road" />
                                <p>Tổng Số Km</p>
                                <h3>
                                    <b>95km</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-motorcycle" />
                                <p>Tổng Số Cuốc</p>
                                <h3>
                                    <b>5</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 text-center">
                                <div className="wrapperBlock">
                                <i className="fas fa-money-check-alt" />
                                <p>Tổng Số Tiền</p>
                                <h3>
                                    <b>780.000đ</b>
                                </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>{" "}
                    {/* byWeek */}
                    <div className="byMonth">
                    <span className="titleBy">
                        <i className="fas fa-coins" />
                        &nbsp;Thống kê theo tháng
                    </span>
                    <div className="form-group">
                        <select className="form-control">
                            <option disabled>Chọn tháng</option>
                            <option defaultValue="selected">Tháng 1</option>
                            <option>Tháng 2</option>
                            <option>Tháng 3</option>
                            <option>Tháng 4</option>
                            <option>Tháng 5</option>
                            <option>Tháng 6</option>
                            <option>Tháng 7</option>
                            <option>Tháng 8</option>
                            <option>Tháng 9</option>
                            <option>Tháng 10</option>
                            <option>Tháng 11</option>
                            <option>Tháng 12</option>
                        </select>
                    </div>
                    <div className="container">
                        <div className="row text-center wrapperRow">
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-road" />
                                <p>Tổng Số Km</p>
                                <h3>
                                    <b>95km</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <div className="wrapperBlock">
                                <i className="fas fa-motorcycle" />
                                <p>Tổng Số Cuốc</p>
                                <h3>
                                    <b>5</b>
                                </h3>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-4 text-center">
                                <div className="wrapperBlock">
                                <i className="fas fa-money-check-alt" />
                                <p>Tổng Số Tiền</p>
                                <h3>
                                    <b>780.000đ</b>
                                </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>{" "}
                    {/* byMonth */}
                </div>{" "}
                {/* content */}
            </div>
        </div>
        </div>
    );
}
}

export default StatisticalDriver;
