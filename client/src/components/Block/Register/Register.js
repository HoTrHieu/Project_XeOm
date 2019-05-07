import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div id="register">
  <div className="wrapperRegister">
    {/* title is shared */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="titleMain text-center">
            lái xe với H3
          </h2>
          <p className="text-center" style={{margin: 0, padding: 0}}>
            <small>Nhập thông tin cơ bản của bạn để bắt đầu</small>
          </p>
        </div>
      </div>
    </div>
    <div className="content">
      <div className="container">
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <input type="text"  className="form-control" placeholder="Tên" />
            </div>
            <div className="col-6">
              <input type="text"  className="form-control" placeholder="Họ và tên đệm" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <input type="text"  className="form-control" placeholder="Số di động" />
        </div>
        <div className="form-group">
          <input type="text"  className="form-control" placeholder="Biển số xe" />
        </div>
        <div className="form-group">
          <div className="inputFile">
            <label id="#bb"> Ảnh đại diện bác tài
              <input type="file" id="File" className="form-control-file inputFile" aria-describedby="fileHelpId" />
            </label> 
          </div>
        </div>
        <div className="form-group">
          <div className="inputFile">
            <label id="#bb"> Ảnh của xe
              <input type="file" id="File" className="form-control-file inputFile" aria-describedby="fileHelpId" />
            </label> 
            <input type="file" className="form-control-file inputFile" aria-describedby="fileHelpId" />
          </div>
        </div>
        <div className="form-group">
          <button type="button"  className="btn btn-success btnRegister btn-block">
            Đăng Ký
          </button>
        </div>
      </div>
    </div>
    {/* content */}
  </div>
  {/* wrapperRegister */}
</div>

        );
    }
}

export default Register;