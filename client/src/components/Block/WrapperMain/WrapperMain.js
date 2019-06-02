import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { decode } from 'punycode';

class WrapperMain extends Component {
    constructor(props){
        super(props)
        this.state = {
            taixe: {},
            UserName: ''
        }  
    }
    componentWillMount(){
        const token = localStorage.getItem('taikhoan')
        const decoded = jwt_decode(token);
        const username = decoded.UserName;
        console.log(decoded) 
        // this.setState({ UserName: username });
        // console.log("user name nek",this.state.UserName)
            // console.log("didmount",this.state.UserName)
        if(decode.LoaiTaiKhoan ==='TaiXe'){
            this.getData(username);
        } 
       
    }
    getData = (id) =>{
        const link = 'http://localhost:8080/taixe/' + id;
        axios.get(link)
        .then( res=> {
            const taixe = res.data.taixe
            this.setState({
                taixe: taixe
            })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
// componentWillMount(){
//    this.getData()
 
// }

    render() {
        
        return (
            <div className="wrapperMain">
                <div className="container-fluid ct-f-sideBar">
                    <div className="row r-sideBar">
                        <div className="col-sm-3 d-none d-sm-block" id="sideBar">
                            <p className="text-center">Xin chào Bác Tài</p>
                            <div className="wrapperAvtSideBar">
                                <img src="./templates/users/lib/images/image002_2.jpg" alt="" className="img-fluid avatarSideBar" />
                            </div>
                            <ul>
                                <Link to="/profile">
                                    <li className="active">
                                        <i className="fas fa-user" />&nbsp;<span>Thông tin</span> 
                                        <div>Thông tin</div> 
                                    </li>
                                </Link>
                            <Link to="/statistical">
                                <li>
                                    <i className="fas fa-chart-bar" />&nbsp;<span> Thống kê</span>
                                    <div>Thống kê</div> 
                                </li>
                            </Link>
                            <Link to="/login">
                                <li>
                                    <i className="fas fa-sign-out-alt" />&nbsp;<span>Đăng xuất</span> 
                                    <div>Đăng xuất</div> 
                                </li>
                            </Link>
                            </ul>
                        </div> {/* sideBar */}
                        <div className="col-xs-12 col-sm-9" id="content">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                            <h2 className="titleMain text-center">
                                Thông tin Bác Tài
                            </h2>
                            </div>
                        </div>
                        </div>
                        <div className="container-fluid" id="sideBarSub">
                        <div className="row">
                            <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="profile.html">
                                <li className="active">
                                    <i className="fas fa-user" />
                                    <div>Thông tin</div> 
                                </li>
                                </a>
                            </ul>
                            </div>
                            <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="statistical.html">
                                <li>
                                    <i className="fas fa-chart-bar" />
                                    <div>Thống kê</div> 
                                </li>
                                </a>
                            </ul>
                            </div>
                            <div className="col-4 d-block d-sm-none">
                            <ul>
                                <a href="/">
                                <li>
                                    <i className="fas fa-sign-out-alt" />
                                    <div>Đăng xuất</div> 
                                </li>
                                </a>
                            </ul>
                            </div>
                        </div> {/* row */}
                        </div> {/* sideBarSub */}
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 wrapperImgProfileContent">
                            <label htmlFor="true">Ảnh đại diện</label> <br />
                            <img src="./templates/users/lib/images/image002_2.jpg" alt="" className="img-fluid imgProfileContent" />
                            <div className="inputFile">
                                <label id="#bb"> Đổi ảnh đại diện bác tài
                                <input type="file" id="File" className="form-control-file inputFile" name="true" placeholder="true" aria-describedby="fileHelpId" />
                                </label> 
                            </div>
                            </div> {/* wrapperImgProfileContent */}
                            <div className="col-xs-12 col-sm-6 wrapperImgProfileContent">
                            <label htmlFor="true">Ảnh xe</label> <br />
                            <img src="./templates/users/lib/images/Gia-xe-Honda-Vision-thang-5-9-1525418495-315-width500height391.jpg" alt="" className="img-fluid imgProfileContent" />
                            <div className="inputFile">
                                <label id="#bb"> Đổi ảnh xe
                                <input type="file" id="File" className="form-control-file inputFile" name="true" placeholder="true" aria-describedby="fileHelpId" />
                                </label> 
                            </div>
                            </div> {/* wrapperImgProfileContent */}
                            {/* {TaiXe} */}
                            <div className="col-xs-12 col-sm-6">
                                                    
                            <div className="form-group">
                                <label htmlFor="true">Địa Chỉ</label>
                                <input type="text" className="form-control" defaultValue={this.state.taixe.DiaChi} />
                            </div>
                            </div>  
                            <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="true">Họ và Tên</label>
                                <input type="text"  className="form-control" placeholder="Họ và tên đệm" defaultValue={this.state.taixe.HoTen} />
                            </div>
                            </div>  
                            <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="true">Số điện thoại</label>
                                <input type="text" className="form-control" placeholder="Số điện thoại" defaultValue={this.state.taixe.SoDienThoai} />
                            </div>
                            </div>   
                            <div className="col-xs-12 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="true">Biển số xe</label>
                                <input type="text" className="form-control" placeholder="Biển số xe" defaultValue={this.state.taixe.BienSoXe} />
                            </div>
                            </div>  
                            
                            <div className="col-12">
                            <div className="form-group">
                                <button type="button" className="btn btn-success btnRegister btn-block">
                                Lưu Thay Đổi
                                </button>
                            </div> 
                            </div> {/* col */}
                        </div>
                        </div> {/* content */}
                    </div>
                    </div>
                </div> {/* wrapperMain */}
            </div>

        );
    }
}

export default WrapperMain;