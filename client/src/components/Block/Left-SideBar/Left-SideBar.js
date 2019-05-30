import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class LeftSideBar extends Component {
    render() {
        return (
          
            <div className="col-3" id="sideBar">
            <p className="text-center">Xin chào Quản trị viên</p>
            <div className="wrapperAvtSideBar">
              <img src="./templates/admin/lib/images/logoadmin.jpg" alt='' className="img-fluid avatarSideBar" />
            </div>
            <ul className="menuParent">
              <Link to="/index-admin">
                <li className="parent ">
                  <i className="fas fa-user" />&nbsp;Danh Sách Bác Tài
                </li>
              </Link>
              <a href>
                <li className="parent ">
                  <i className="fas fa-chart-bar" />&nbsp;Thống Kê
                </li>
              </a>
              <ul className="subMenu"><a href> </a>
                <Link to="alldrivers"><li><i className="far fa-dot-circle" />&nbsp;Tất Cả Bác Tài</li></Link>
                <Link to="driver"><li><i className="far fa-dot-circle" />&nbsp;Từng Bác Tài</li></Link>
                  
              </ul>
              <Link to='/login'>
                <li className="parent">
                  <i className="fas fa-sign-out-alt" />&nbsp;Đăng xuất
                </li>
              </Link>
            </ul>
          </div> 
        );
    }
}
export default LeftSideBar;
