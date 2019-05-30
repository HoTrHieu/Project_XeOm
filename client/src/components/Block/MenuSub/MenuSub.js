import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                        <li className="menuChose"><Link to="book"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</Link></li>
                                <li className="menuChose">
                                    <Link to="register"><i className="fas fa-motorcycle" />&nbsp;Trở Thành Tài Xế</Link>
                                </li>
                                <li className="menuChose"><Link to="login"><i className="fas fa-sign-in-alt" />&nbsp;Đăng Nhập</Link></li>
                        </ul>
                    </div> {/* contentMenuSub */}
                </div>
            </div>

        );
    }
}

export default MenuSub;