import React, { Component } from 'react';
 
class OneDriver extends Component {
    render() {
        return (
            
            <div className="col-9 statistical" id="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <h2 className="titleMain text-center">
                    Thống Kê Theo Bác Tài
                  </h2>
                </div>
              </div>
            </div>
            <div className="container statisticalDriver">
              <div className="row">
                <div className="col-6 selectSort">
                  <div className="form-group">
                    <select className="form-control" name id>
                      <option selected>Km tăng dần</option>
                      <option>Km giảm dần</option>
                      <option>Số tiền tăng dần</option>
                      <option>Số tiền giảm dần</option>
                      <option>Số chuyến tăng dần</option>
                      <option>Số chuyến giảm dần</option>
                    </select>
                  </div>
                </div> {/* selectSort */}
                <div className="col-6 search text-center">
                  <form className="form-inline md-form form-sm">
                    <input className="form-control mr-3 w-75" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                    <i className="fas fa-search" aria-hidden="true" />
                  </form>
                </div>{/* search */}
              </div> {/* row */}
              <div className="row wrapperInfoDriver">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-1 imgDriverStatiscal">
                      <img src="./templates/admin/lib/images/logoadmin.jpg" alt="" className="img-fluid" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 selectName">
                      <div className="form-group">
                        <select className="form-control" name id>
                          <option>Hồ Công Hậu</option>
                          <option>Hồ Trung Hiếu</option>
                          <option>Lê Thanh Hải</option>
                        </select>
                      </div>
                    </div> {/* selectName */}
                    <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                      <i className="fas fa-motorcycle" />&nbsp;60B3 - 47157
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                      <i className="fas fa-mobile-alt" />&nbsp;0123.456.789
                    </div>
                  </div>
                </div>
              </div> {/* row */}
            </div> {/* statisticalDriver */}
          </div>
          
            
        );
    }
}

export default OneDriver;
