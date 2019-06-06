    import React, { Component } from "react";

    class Confirm extends Component {
    render() {
        return (
        <div id="confirmDriver">
            <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-8 map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.67522812481!2d106.67437147917477!3d10.766478188433842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRwLiBIQ00!5e0!3m2!1svi!2s!4v1559716477029!5m2!1svi!2s"
                    width="100%"
                    height={450}
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    title="mapConfirm"
                />
                </div>
                <div className=" col-xs-12 col-md-4 bookCustomer">
                <h4 className="titleBook" style={{ color: "#fff" }}>
                    Thông tin khách hàng
                </h4>
                <div className="form-group">
                    <input
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Địa điểm đón"
                    aria-describedby="helpId"
                    readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Địa điểm đến"
                    aria-describedby="helpId"
                    readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Số điện thoại"
                    aria-describedby="helpId"
                    readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Số km dự tính : 15km"
                    aria-describedby="helpId"
                    readOnly
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    name
                    id
                    className="form-control"
                    placeholder="Số tiền dự tính : 30.000đ"
                    aria-describedby="helpId"
                    readOnly
                    />
                </div>
                <div className="form-group text-right">
                    <div className="row">
                    <div className="col-6">
                        <button
                        type="button"
                        name
                        id
                        className="btn btn-success btn-block btnRegister btn-danger"
                        >
                        Không Nhận &nbsp;
                        <i className="far fa-times-circle" />
                        </button>
                    </div>
                    <div className="col-6">
                        <button
                        type="button"
                        name
                        id
                        className="btn btn-success btn-block btnRegister btn-block"
                        >
                        Nhận Chuyến&nbsp;
                        <i className="far fa-check-circle" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
    }

    export default Confirm;
