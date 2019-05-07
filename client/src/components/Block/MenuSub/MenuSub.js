import React, { Component } from 'react';

class MenuSub extends Component {
    render() {
        return (
            <div id="menuSub">
                <div className="container-fluid">
                    <div className="col-12 close text-right">
                        <i className="fas fa-times" />
                    </div>
                    <div className="contentMenuSub">
                        <ul>
                            <li className="menuChose"><a href="book.html"><i className="fas fa-mobile-alt" /><p>Đặt Xe</p></a></li>
                            <li className="menuChose">
                                <a href="register.html"><i className="fas fa-motorcycle" /><p>Trở Thành Tài Xế</p></a>
                            </li>
                            <li className="menuChose"><a href="login.html"><i className="fas fa-sign-in-alt" /><p>Đăng Nhập</p></a></li>
                        </ul>
                    </div> {/* contentMenuSub */}
                </div>
            </div>

        );
    }
}

export default MenuSub;