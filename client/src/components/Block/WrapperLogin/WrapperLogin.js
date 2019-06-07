import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { login } from "../../../actions/UserFunctions";
import jwt_decode from 'jwt-decode';

class WrapperLogin extends Component {
constructor(props) {
    super(props);
    this.state = {
    UserName: "",
    PassWord: "",
    Error:"",
    role: ""
    };


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
}

onSubmit(e) {
    e.preventDefault();

    const taikhoan = {
    UserName: this.state.UserName,
    PassWord: this.state.PassWord
    };

    login(taikhoan).then((res) => {
        if(res.error){
            if(res.error === 'incorrect'){
                this.setState({ Error: "Số điện thoại hoặc mật khẩu chưa chính xác" });
            } else if(res.error === 'notactivated'){
                this.setState({ Error: "Số điện thoại chưa được kích hoạt hoặc đã bị khoá" });
            } else if(res.error === 'ErrorUserName' || res.error === 'ErrorPassWord'){
                this.setState({ Error: "Số điện thoại và mật khẩu không được trống" });
            }
            
        } else if (res) {
            const token = localStorage.getItem('taikhoan');
            const decoded = jwt_decode(token);
            const role = decoded.LoaiTaiKhoan;
            if(role === 'TaiXe'){
                console.log(role)
                window.location = '/profile';
                // this.props.history.push(`/profile`)
            }else{
                console.log(role);
                window.location = '/index-admin';
                // this.props.history.push(`/index-admin`)
            }
            /* this.props.history.push(`/profile`)  */ 
        }
    });
}
render() {
    return (
    <div id="wrapperLogin" history={this.props.history} >
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-12">
                <h2 className="titleMain ">xin chào bác tài</h2>
                <p>
                    <small>Bác điền thông tin đăng nhập vào ô dưới nhé!!!</small>
                </p>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-auto formLogin">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-mobile-alt" />
                                    &nbsp;&nbsp; Số Điện Thoại
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="UserName"
                                    aria-describedby="helpId"
                                    placeholder="Số điện thoại ..."
                                    value={this.state.UserName}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-key" />
                                    &nbsp;&nbsp;Mật Khẩu
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="PassWord"
                                    aria-describedby="helpId"
                                    placeholder="Mật khẩu ..."
                                    value={this.state.PassWord}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group text-center">
                                <span style={{color: 'yellow', fontStyle: 'italic'}}>{this.state.Error}</span>
                            </div>
                            <div className="form-group" />
                                <div className="form-group text-center">
                                    <button className="btn btn-light btnLogin" type="submit">
                                        Đăng Nhập
                                    </button>
                                </div>
                                <div className="form-group text-center">
                                <p>
                                    <span>Quên mật khẩu</span>
                                </p>
                                <p>
                                    <Link to="/register">
                                    Bác chưa có tài khoản. Nhấn vào để đăng ký?
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* content */}
    </div>
    );
}
}

export default withRouter(WrapperLogin);
