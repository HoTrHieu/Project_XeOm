import React, { Component } from 'react';

class Side extends Component {
    render() {
        return (
            <div id="slide">
                <div id="carouselId" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselId" data-slide-to={0} className="active" />
                        <li data-target="#carouselId" data-slide-to={1} />
                        <li data-target="#carouselId" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active" style={{backgroundImage: 'url("./templates/users/lib/images/grab_safety_headerimage.png")', height: '558.6px'}}>
                            <div className="carousel-caption d-none d-md-block">
                                <h1>
                                    Nỗ lực để mang đến<br />CUỘC SỐNG AN TOÀN<br />HƠN MỖI NGÀY
                                </h1>
                                <button className="btn btn-success btn-lg">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                        <div className="carousel-item" style={{backgroundImage: 'url("./templates/users/lib/images/01_hero_banner.jpg")', height: '558.6px'}}>
                            <div className="carousel-caption d-none d-md-block">
                                <h1>GrabTaxi. GrabCar.<br />GrabBike. GrabExpress.</h1>
                                <p>Trên cùng một ứng dụng</p>
                                <button className="btn btn-success btn-lg">TẢI NGAY</button>
                            </div>
                        </div>
                        <div className="carousel-item" style={{backgroundImage: 'url("./templates/users/lib/images/02_hero_banner.jpg")', height: '558.6px'}}>
                            <div className="carousel-caption d-none d-md-block">
                                <h1>
                                    Hơn 11 triệu người dùng.<br />200 nghìn tài xế.<br />Đã thoải
                                    mái khi di chuyển
                                </h1>
                                <button className="btn btn-success btn-lg">TÌM HIỂU THÊM</button>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                {/* carouselId */}
            </div>

        );
    }
}

export default Side;