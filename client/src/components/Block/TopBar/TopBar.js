import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class TopBar extends Component {
    logOut(e){
        e.preventDefault();
        localStorage.removeItem('taikhoan');
        this.props.history.push(`/`)
    }
    getRole(){
        if(localStorage.getItem('taikhoan')){
            const token = localStorage.getItem('taikhoan');
            const decoded = jwt_decode(token);
            const role = decoded.LoaiTaiKhoan;
            return role
        }
    }
    /* componentDidMount(){
        var idIconBar = document.getElementById('iconBar');
        idIconBar.addEventListener('click',()=>{
            var menuSub = document.getElementById('menuSub');;
           menuSub.classList.add('show'); 
        })
    } */
    render() {
        const role = this.getRole();
        const customLink =( 
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
        const driverLink =( 
            <ul>
                <li className="menuChose">
                    <Link to="book"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</Link>
                </li>
                <li className="menuChose">
                    <Link to="/profile"><i className="fas fa-user"></i>&nbsp;Thông tin cá nhân</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;Đăng Xuất</Link>
                </li>
            </ul>
        )
        const adminLink =( 
            <ul>
                <li className="menuChose">
                    <Link to="/index-admin"><i className="fas fa-user"></i>&nbsp;Quản lý</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;Đăng Xuất</Link>
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
                            {role ? (role==='admin'?adminLink:driverLink): customLink}
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