import React, { Component } from "react";

class WrapperLogin extends Component {
  render() {
    return (
        <div id="wrapperLogin">
            <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12">
                <h2 className="titleMain ">xin chào bác tài</h2>
                <p>
                    <small>Bác điền thông tin đăng nhập vào ô dưới nhé!!!</small>
                </p>
                </div>
            </div>
            </div>
            <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-auto formLogin">
                    <div className="form-group">
                    <label htmlFor>
                        <i className="fas fa-mobile-alt" />
                        &nbsp;&nbsp; Số Điện Thoại
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name
                        id
                        aria-describedby="helpId"
                        placeholder
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor>
                        <i className="fas fa-key" />
                        &nbsp;&nbsp;Mật Khẩu
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name
                        id
                        aria-describedby="helpId"
                        placeholder
                    />
                    </div>
                    <div className="form-group" />
                    <div className="form-group text-center">
                    <button className="btn btn-light btnLogin">Đăng Nhập</button>
                    </div>
                    <div className="form-group text-center">
                    <p>
                        <a href>Quên mật khẩu</a>
                    </p>
                    <p>
                        <a href="register.html">
                        Bác chưa có tài khoản. Nhấn vào để đăng ký?
                        </a>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            {/* content */}
        </div>
    );
  }
}

export default WrapperLogin;
