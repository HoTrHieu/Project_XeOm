import React, { Component } from 'react';

class TopBar extends Component {
    render() {
        return (
            <div id="topBar">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <div className="wrapperLogo">
                                <a href="index.html"><img src="./templates/users/lib/images/logo-01.png" alt="" className="img-fluid" width="100%" /></a>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="titleLogo">
                                <h3>Xe Ôm Công Nghệ - H3</h3>
                            </div>
                        </div>
                        <div className="col-6 menuChoosse text-right">
                            <ul>
                                <li className="menuChose"><a href="book.html"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</a></li>
                                <li className="menuChose">
                                    <a href="register.html"><i className="fas fa-motorcycle" />&nbsp;Trở Thành Tài Xế</a>
                                </li>
                                <li className="menuChose"><a href="login.html"><i className="fas fa-sign-in-alt" />&nbsp;Đăng Nhập</a></li>
                            </ul>
                        </div>
                        <div id="iconBar">
                            <i className="fas fa-bars" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default TopBar;