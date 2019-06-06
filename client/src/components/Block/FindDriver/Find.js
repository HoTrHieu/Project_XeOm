import React, { Component } from 'react';

class Find extends Component {
    render() {
        return (
            <div id="contentFindDriver">
            <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-2 wrapperImg">
                <div className="img text-center">
                    <img
                    src="./templates/users/lib/images/user.png"
                    className="img-fluid"
                    alt="img"
                    />
                    <p className="tenBacTai">
                    <b>HO CONG HAU</b>
                    </p>
                    <p>
                    <i className="fas fa-mobile-alt" />
                    &nbsp;0123456789
                    </p>
                </div>
                </div>
                <div className="col-xs-12 col-md-8 map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.67522812481!2d106.67437147917477!3d10.766478188433842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRwLiBIQ00!5e0!3m2!1svi!2s!4v1559716477029!5m2!1svi!2s"
                    width="100%"
                    height={450}
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    title="mapFind"
                />
                </div>
                <div className="col-xs-12 col-md-2 wrapperImg">
                <div className="img text-center">
                    <img
                    src="./templates/users/lib/images/user.png"
                    className="img-fluid"
                    alt="img"
                    />
                    <p className="bienSoXe">
                    <b>51G-11111</b>
                    </p>
                </div>
                </div>
            </div>{" "}
            {/* row */}
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button className="btn btn-danger btnAction">
                        Hủy&nbsp;
                        <i className="far fa-times-circle" />
                    </button>&nbsp;
                    <button className="btn btn-success btnAction">
                        Đặt xe&nbsp;
                        <i className="far fa-check-circle" />
                    </button>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Find;