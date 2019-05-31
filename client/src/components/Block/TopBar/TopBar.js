import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class TopBar extends Component {
    logOut(e){
        e.preventDefault();
        localStorage.removeItem('taikhoan');
        this.props.history.push(`/`)
    }
    render() {
        const loginRegLink =( 
            <ul>
                <li className="menuChose">
                    <Link to="book"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</Link>
                </li>
                <li className="menuChose">
                    <Link to="register"><i className="fas fa-motorcycle" />&nbsp;Trở Thành Tài Xế</Link>
                </li>
                <li className="menuChose">
                    <Link to="login"><i className="fas fa-sign-in-alt" />&nbsp;Đăng Nhập</Link>
                </li>
            </ul>
        )
        const userLink =( 
            <ul>
                <li className="menuChose">
                    <Link to="book"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</Link>
                </li>
                <li className="menuChose">
                    <Link to="profile"><i className="fas fa-user"></i>&nbsp;Thông tin cá nhân</Link>
                </li>
                <li className="menuChose">
                    <a href="" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;Đăng Xuất</a>
                </li>
            </ul>
        )
        return (
            <div id="topBar" history = {this.props.history}>
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <div className="wrapperLogo">
                                <Link to="/"><img src="./templates/users/lib/images/logo-01.png" alt="" className="img-fluid" width="100%" /></Link>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="titleLogo">
                                <h3>Xe Ôm Công Nghệ - H3</h3>
                            </div>
                        </div>
                        <div className="col-6 menuChoosse text-right">
                            {localStorage.taikhoan ? userLink: loginRegLink}
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

export default withRouter(TopBar);