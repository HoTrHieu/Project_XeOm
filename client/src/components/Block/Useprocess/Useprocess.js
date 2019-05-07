import React, { Component } from 'react';

class Useprocess extends Component {
    render() {
        return (
            <div id="useprocess">
                {/* title is shared */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="titleMain text-center">
                                quy trình sử dụng
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>Thoải mái lái xe cùng H3</p>
                            </div>
                        </div>
                        {/* row */}
                        <div className="row">
                            <div className="col-xs-12 col-md-5 text-xs-center text-sm-right wrapperImgPhone">
                            <img src="./templates/users/lib/images/empty-v2.png" alt="" width="70%" />
                            <div className="imgPhone">
                                <img src="./templates/users/lib/images/1_step-1.jpg" alt="" />
                            </div>
                            </div>
                            {/* wrapperImgPhone */}
                            <div className="col-xs 12 col-md-7 text-xs-center text-sm-left wrapperInfo">
                            <div className="info">
                                <div className="row">
                                <div className="col-1 numberInfo">
                                    <span>1</span>
                                </div>
                                <div className="col-11 detailInfo">
                                    <p className="titleDetailInfo">
                                    <b>Nhận đặt chuyến</b>
                                    </p>
                                    <p>
                                    Mở ứng dụng để bắt đầu nhận đặt chuyến của khách hàng.
                                    </p>
                                </div>
                                </div>
                            </div>
                            {/* info */}
                            <div className="info">
                                <div className="row">
                                <div className="col-1 numberInfo">
                                    <span>2</span>
                                </div>
                                <div className="col-11 detailInfo">
                                    <p className="titleDetailInfo">
                                    <b>Nhận cuốc xe</b>
                                    </p>
                                    <p>
                                    Chấp thuận đặt chuyến để nhận được thông tin đầy đủ của
                                    khách hàng.
                                    </p>
                                </div>
                                </div>
                            </div>
                            {/* info */}
                            <div className="info">
                                <div className="row">
                                <div className="col-1 numberInfo">
                                    <span>3</span>
                                </div>
                                <div className="col-11 detailInfo">
                                    <p className="titleDetailInfo">
                                    <b>Đón khách</b>
                                    </p>
                                    <p>
                                    Hệ thống định vị GPS sẽ hiển thị địa điểm của khách hàng
                                    để đến đón.
                                    </p>
                                </div>
                                </div>
                            </div>
                            {/* info */}
                            <div className="info">
                                <div className="row">
                                <div className="col-1 numberInfo">
                                    <span>4</span>
                                </div>
                                <div className="col-11 detailInfo">
                                    <p className="titleDetailInfo">
                                    <b>Trả khách</b>
                                    </p>
                                    <p>
                                    Chọn phím Trả Khách khi đã đến nơi và nhận tiền thanh
                                    toán.
                                    </p>
                                </div>
                                </div>
                            </div>
                            {/* info */}
                            </div>
                            {/* wrapperInfo */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Useprocess;