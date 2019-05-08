import React, { Component } from 'react'

class WrapperLoginAdmin extends Component {
  render() {
    return (
        <div id="wrapperLogin">
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-12">
                        <h2 className="titleMain ">
                            Chào Admin
                        </h2>
                    </div>
                </div>
                </div>
            <div className="content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-auto formLogin">
                            <div className="form-group">
                                <label htmlFor><i className="fas fa-mobile-alt" />&nbsp;&nbsp; Số Điện
                                    Thoại</label>
                                <input type="text" className="form-control" name id aria-describedby="helpId" placeholder />
                            </div>
                            <div className="form-group">
                                <label htmlFor><i className="fas fa-key" />&nbsp;&nbsp;Mật Khẩu</label>
                                <input type="text" className="form-control" name id aria-describedby="helpId" placeholder />
                            </div>
                            <div className="form-group text-center">
                                <button className="btn btn-light btnLogin">Đăng Nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      
    )
  }
}
export default WrapperLoginAdmin;


