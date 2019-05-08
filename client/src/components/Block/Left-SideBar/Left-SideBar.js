import React, { Component } from 'react';

class LeftSideBar extends Component {
    render() {
        return ( 
            <div className="col-3" id="sideBar">
            <p className="text-center">Xin chào Quản trị viên</p>
            <div className="wrapperAvtSideBar">
              <img src="./templates/admin/lib/images/logoadmin.jpg" alt='' className="img-fluid avatarSideBar" />
            </div>
            <ul className="menuParent">
              <a href="index.html">
                <li className="parent">
                  <i className="fas fa-user" />&nbsp;Danh Sách Bác Tài
                </li>
              </a>
              <a href>
                <li className="parent active">
                  <i className="fas fa-chart-bar" />&nbsp;Thống Kê
                </li>
              </a><ul className="subMenu"><a href>
                </a><a href="allDrivers.html"><li><i className="far fa-dot-circle" />&nbsp;Tất Cả Bác Tài</li></a>
                <a href="driver.html"><li className="active"><i className="far fa-dot-circle" />&nbsp;Từng Bác Tài</li></a>  
              </ul>
              <a href>
                <li className="parent">
                  <i className="fas fa-sign-out-alt" />&nbsp;Đăng xuất
                </li>
              </a>
            </ul>
          </div> 
        );
    }
}
export default LeftSideBar;
