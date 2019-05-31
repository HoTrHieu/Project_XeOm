import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { register } from "../../../actions/UserFunctions";

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      HoTen: '',
      SoDienThoai: '',
      DiaChi:'',
      BienSoXe:'',
      AnhDaiDien: 'avt.jpg',
      AnhXe: 'avt.jpg',
      PassWord: '',
      PassWordConfirm: '',
      TinhTrang: 'ChuaKichHoat',
      LoaiTaiKhoan: 'TaiXe',

      ErrorHoTen:"",
      ErrorSoDienThoai:"",
      ErrorBienSoXe:"",
      ErrorDiaChi:"",
      ErrorAnhDaiDien:"",
      ErrorAnhXe:"",
      ErrorPassWord:"",
/*       ErrorPassWordConfirm:"",
      PasswordMismatch:"", */
      LengthPassWord:"",
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value  });
  }

  onSubmit(e){
    e.preventDefault()

    const thongtin = {
      HoTen: this.state.HoTen,
      SoDienThoai: this.state.SoDienThoai,
      DiaChi: this.state.DiaChi,
      BienSoXe: this.state.BienSoXe,
      AnhDaiDien: this.state.AnhDaiDien,
      AnhXe: this.state.AnhXe,

      PassWord: this.state.PassWord,
      PassWordConfirm : this.state.PassWordConfirm,
      TinhTrang: this.state.TinhTrang,
      LoaiTaiKhoan: this.state.LoaiTaiKhoan,
    }
    register(thongtin).then((res) => {
      console.log(res);
      if (!res.data.error) {
          this.props.history.push(`login`)  
      }else{
        this.setState({ 
          ErrorHoTen:"",
          ErrorSoDienThoai:"",
          ErrorBienSoXe:"",
          ErrorDiaChi:"",
          ErrorAnhDaiDien:"",
          ErrorAnhXe:"",
          ErrorPassWord:"",
         /*  ErrorPassWordConfirm:"", */
          /* PasswordMismatch:"", */
          LengthPassWord:""
        });
        if(res.data.error === 'ErrorHoTen'){
            this.setState({ ErrorHoTen: "Họ và Tên không được trống" });
        }
        if(res.data.error === 'ErrorSoDienThoai'){
            this.setState({ ErrorSoDienThoai: "Số điện thoại không được trống" });
        }
        if(res.data.err === 'exists'){
          this.setState({ ErrorSoDienThoai: "Số điện thoại đã được sử dụng" });
      }
        if(res.data.error === 'ErrorBienSoXe'){
          this.setState({ ErrorBienSoXe: "Biển số xe không được trống" });
        }
        if(res.data.error === 'ErrorDiaChi'){
          this.setState({ ErrorDiaChi: "Địa chỉ không được trống" });
        }
        if(res.data.error === 'ErrorAnhDaiDien'){
          this.setState({ ErrorAnhDaiDien: "Ảnh đại diện không được trống" });
        }
        if(res.data.error === 'ErrorAnhXe'){
          this.setState({ ErrorAnhXe: "Ảnh xe không được trống" });
        }
        if(res.data.error === 'ErrorPassWord'){
          this.setState({ ErrorPassWord: "Mật khẩu không được trống" });
        }
        /* if(res.data.error === 'ErrorPassWordConfirm'){
          this.setState({ ErrorPassWordConfirm: "Mật khẩu xác nhận không được trống" });
        }   */
       /*  if(res.data.error === 'PasswordMismatch'){
          this.setState({ PasswordMismatch: "Mật khẩu xác nhận không trùng khớp" });
        }   */
        if(res.data.error === 'LengthPassWord'){
          this.setState({ LengthPassWord: 'Mật khẩu có ít nhất 6 ký tự' });
        }
      }
  });
  }

  render() {
    return (
      <div id="register" history={this.props.history}>
        <div className="wrapperRegister">
          {/* title is shared */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h2 className="titleMain text-center">lái xe với H3</h2>
                <p className="text-center" style={{ margin: 0, padding: 0 }}>
                  <small>Nhập thông tin cơ bản của bạn để bắt đầu</small>
                </p>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và Tên"
                        name="HoTen"
                        value={this.state.HoTen}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorHoTen}</span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số di động"
                    name="SoDienThoai"
                    value={this.state.SoDienThoai}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorSoDienThoai}</span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Biển số xe"
                    name="BienSoXe"
                    value={this.state.BienSoXe}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorBienSoXe}</span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="PassWord"
                    value={this.state.PassWord}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorPassWord}</span>
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.LengthPassWord}</span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    name="PassWordConfirm"
                    value={this.state.PassWordConfirm}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                    {/* <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorPassWordConfirm}</span> */}
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.PasswordMismatch}</span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ hiện tại"
                    name="DiaChi"
                    value={this.state.DiaChi}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorDiaChi}</span>
                </div>
                {/* <div className="form-group">
                  <div className="inputFile">
                    <label id="#bb">
                      {" "}
                      Ảnh đại diện bác tài
                      <input
                        type="file"
                        id="File"
                        className="form-control-file inputFile"
                        aria-describedby="fileHelpId"
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group text-center">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorAnhDaiDien}</span>
                </div>
                <div className="form-group">
                  <div className="inputFile">
                    <label id="#bb">
                      {" "}
                      Ảnh của xe
                      <input
                        type="file"
                        id="File"
                        className="form-control-file inputFile"
                        aria-describedby="fileHelpId"
                      />
                    </label>
                    <input
                      type="file"
                      className="form-control-file inputFile"
                      aria-describedby="fileHelpId"
                    />
                  </div>
                </div>
                <div className="form-group text-center">
                    <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorAnhXe}</span>
                </div> */}
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btnRegister btn-block"
                  >
                    Đăng Ký
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* content */}
        </div>
        {/* wrapperRegister */}
      </div>
    );
  }
}

export default withRouter(Register);
