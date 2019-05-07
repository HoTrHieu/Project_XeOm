import React, { Component } from 'react';

class Blook extends Component {
    render() {
        return (
            <div id="book">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-md-8 map">
                            <iframe title="This title" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6307732935516!2d106.67998301437004!3d10.7629129923307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRwLiBIQ00!5e0!3m2!1svi!2s!4v1556522261696!5m2!1svi!2s" width="100%" height={450} frameBorder={0} style={{border: 0}} allowFullScreen />
                        </div>
                        {/* map */}
                        <div className=" col-xs-12 col-md-4 bookCustomer">
                            <h4 className="titleBook">Thông tin khách hàng</h4>
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Địa điểm đón" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Địa điểm đến" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Số điện thoại" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Số km dự tính : 15km" aria-describedby="helpId" readOnly />
                            </div>
                            <div className="form-group">
                                <input type="text" name="" id=""className="form-control" placeholder="Số tiền dự tính : 30.000đ" aria-describedby="helpId" readOnly />
                            </div>
                            <div className="form-group text-right">
                                <button type="button" name="" id="" className="btn btn-success btnRegister btn-block">
                                    Đặt Xe &nbsp;&nbsp;<i className="fas fa-motorcycle" />
                                </button>
                            </div>
                        </div>
                        {/* bookCustomer */}
                    </div>
                </div>
            </div>

        );
    }
}

export default Blook;