import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import socKetClient from "socket.io-client"

let socket
class TopBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            point : "http://localhost:8080/"
        }
        socket = socKetClient(this.state.point)
    }
    componentDidMount(){
        this.logOut_socketIO()
    }

    logOut_socketIO = (username) =>{
        socket.emit("logout-tai-khoan", username)
    }
    logOut(e){
       
        e.preventDefault();
        this.logOut_socketIO(jwt_decode(localStorage.getItem("taikhoan")).UserName)
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
    componentDidMount(){
        var idIconBar = document.getElementById('iconBar');
        var menuSub = document.getElementById('menuSub');
        idIconBar.addEventListener('click',()=>{
            menuSub.classList.add('show');
        })

        var idClose = document.getElementById('closeBar');
        idClose.addEventListener('click',()=>{
            menuSub.classList.remove('show');
        })

    }
    render() {
        const role = this.getRole();
        const customLink =( 
            <ul>
                <li className="menuChose" id="idbook">
                    <Link to="book"><i className="fas fa-mobile-alt" />&nbsp;Đặt Xe</Link>
                </li>
                <li className="menuChose" id="idregister">
                    <Link to="register"><i className="fas fa-motorcycle" />&nbsp;Trở Thành Tài Xế</Link>
                </li>
                <li className="menuChose" id="idlogin">
                    <Link to="login"><i className="fas fa-sign-in-alt" />&nbsp;Đăng Nhập</Link>
                </li>
            </ul>
        )
        const driverLink =( 
            <ul>
                <li className="menuChose" id="idprofile">
                    <Link to="/profile"><i className="fas fa-user"></i>&nbsp;Thông tin cá nhân</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;Đăng Xuất</Link>
                </li>
            </ul>
        )
        const adminLink =( 
            <ul>
                <li className="menuChose" id="idmanagement">
                    <Link to="/index-admin"><i className="fas fa-user"></i>&nbsp;Quản lý</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;Đăng Xuất</Link>
                </li>
            </ul>
        )

        const customLinkSub =( 
            <ul>
                <li className="menuChose">
                    <Link to="book"><i className="fas fa-mobile-alt" />&nbsp;<br/>Đặt Xe</Link>
                </li>
                <li className="menuChose">
                    <Link to="register"><i className="fas fa-motorcycle" />&nbsp;<br/>Trở Thành Tài Xế</Link>
                </li>
                <li className="menuChose">
                    <Link to="login"><i className="fas fa-sign-in-alt" />&nbsp;<br/>Đăng Nhập</Link>
                </li>
            </ul>
        )
        const driverLinkSub =( 
            <ul>
                <li className="menuChose">
                    <Link to="/profile"><i className="fas fa-user"></i>&nbsp;<br/> Thông tin cá nhân</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;<br/>Đăng Xuất</Link>
                </li>
            </ul>
        )
        const adminLinkSub =( 
            <ul>
                <li className="menuChose">
                    <Link to="/index-admin"><i className="fas fa-user"></i>&nbsp;<br/>Quản lý</Link>
                </li>
                <li className="menuChose">
                    <Link to="/" onClick={this.logOut.bind(this)}><i className="fas fa-sign-in-alt" />&nbsp;<br/>Đăng Xuất</Link>
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
                <div id="menuSub">
                <div className="container-fluid">
                    <div className="col-12 close text-right" id="closeBar">
                        <i className="fas fa-times" />
                    </div>
                    <div className="contentMenuSub">
                        {role ? (role==='admin'?adminLinkSub:driverLinkSub): customLinkSub}
                    </div> {/* contentMenuSub */}
                </div>
            </div>
            </div>

        );
    }
}

export default withRouter(TopBar);