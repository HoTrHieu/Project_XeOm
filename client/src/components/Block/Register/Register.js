import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { register } from "../../../actions/UserFunctions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        HoTen: "",
        SoDienThoai: "",
        DiaChi: "",
        BienSoXe: "",
        AnhDaiDien: "",
        AnhXe: [],
        PassWord: "",
        PassWordConfirm: "",
        TinhTrang: "ChuaKichHoat",
        HoatDong: "Offline",
        LoaiTaiKhoan: "TaiXe",
        upImgSingle: false,
        upImg: false,

        ErrorHoTen: "",
        ErrorSoDienThoai: "",
        LengthSDT: "",
        ErrorBienSoXe: "",
        ErrorDiaChi: "",
        ErrorAnhDaiDien: "",
        ErrorAnhXe: "",
        ErrorPassWord: "",
        ErrorPassWordConfirm:"",
        PasswordMismatch:"",
        LengthPassWord: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeImgSingle = this.onChangeImgSingle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleUploadSingleImage = this.handleUploadSingleImage.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleUploadImage(ev) {
    const data = new FormData();
    for (var i = 0; i < this.uploadInput.files.length; i++) {
        data.append("file", this.uploadInput.files[i]);
    }
    fetch("http://localhost:8080/upload", {
        method: "POST",
        body: data
    }).then((res) => {
        res.text().then((body) => {
          const data = JSON.parse(body);
          this.setState({
              AnhXe: data.map((obj) => "http://localhost:8080/" + obj)
          });
        });
    }).catch(err=>{
      return false
    });
  }

  handleUploadSingleImage(ev) {
    const data = new FormData();
    data.append("file", this.uploadInputFile.files[0]);

    var t;
    fetch("http://localhost:8080/uploadsingle", {
        method: "POST",
        body: data
    }).then((res) => {
        res.text().then((body) => {
          const data = JSON.parse(body);
          const newData = "http://localhost:8080/" + data.file;
          this.setState({
              AnhDaiDien: newData
          });
          t = data.length
          console.log('TT:', t);
        });
    }).catch(err=>{
      return false
    });
  }

  ValidateUSPhoneNumber(phoneNumber) {
    var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/;
    var phone = phoneNumber.match(regExp);
    if (phone) {
        return true;
    }
    return false;
  }

  onChangeImgSingle(e) {
    this.setState({ upImgSingle : true  });
    this.handleUploadSingleImage();
  }

  onChangeImg(e) {
    this.setState({ upImg: true  });
    this.handleUploadImage();
  }

  onSubmit(e) {
    var self = this;
    e.preventDefault();
    
    /* if(this.state.upImg ===true && this.state.upImgSingle === true){ */
      const thongtin = {
        HoTen: self.state.HoTen,
        SoDienThoai: self.state.SoDienThoai,
        DiaChi: self.state.DiaChi,
        BienSoXe: self.state.BienSoXe,
        AnhDaiDien: self.state.AnhDaiDien,
        AnhXe: self.state.AnhXe,
        HoatDong: self.state.HoatDong,

        PassWord: self.state.PassWord,
        PassWordConfirm: self.state.PassWordConfirm,
        TinhTrang: self.state.TinhTrang,
        LoaiTaiKhoan: self.state.LoaiTaiKhoan
    };
    register(thongtin).then((res) => {
        console.log(res);
        if (!res.data.error) {
          self.props.history.push(`login`);
        } else {
          self.setState({
              ErrorHoTen: "",
              ErrorSoDienThoai: "",
              LengthSDT: "",
              ErrorBienSoXe: "",
              ErrorDiaChi: "",
              ErrorAnhDaiDien:"",
              ErrorAnhXe:"",
              ErrorPassWord: "",
              ErrorPassWordConfirm:"",
              PasswordMismatch:"", 
              LengthPassWord: ""
          });
          if (res.data.error === "ErrorHoTen") {
              self.setState({ ErrorHoTen: "Họ và Tên không được trống" });
          }
          if (res.data.error === "ErrorSoDienThoai") {
              self.setState({
                ErrorSoDienThoai: "Số điện thoại không được trống"
              });
          }
          if (res.data.error === "LengthSDT") {
            self.setState({
              LengthSDT: "Số điện thoại tối thiểu 10 số"
            });
          }
          if(self.ValidateUSPhoneNumber(self.state.SoDienThoai)===false){
            self.setState({
              ErrorSoDienThoai: "Số điện thoại không đúng định dạng. (Gợi ý: 0962815653)"
            });
          }
          if (res.data.error === "exists") {
              self.setState({
                ErrorSoDienThoai: "Số điện thoại đã được sử dụng"
              });
          }
          if (res.data.error === "ErrorBienSoXe") {
              self.setState({
                ErrorBienSoXe: "Biển số xe không được trống"
              });
          }
          if (res.data.error === "ErrorDiaChi") {
              self.setState({ ErrorDiaChi: "Địa chỉ không được trống" });
          }
          if(res.data.error === 'ErrorAnhDaiDien'){
          self.setState({ ErrorAnhDaiDien: "Ảnh đại diện không được trống" });
          }
          if(res.data.error === 'ErrorAnhXe'){
            self.setState({ ErrorAnhXe: "Ảnh xe không được trống hoặc ít nhất 2 tấm" });
          }
          if (res.data.error === "ErrorPassWord") {
              self.setState({ ErrorPassWord: "Mật khẩu không được trống" });
          }
          if(res.data.error === 'ErrorPassWordConfirm'){
            self.setState({ ErrorPassWordConfirm: "Mật khẩu xác nhận không được trống" });
          }
          if(res.data.error === 'PasswordMismatch'){
            self.setState({ PasswordMismatch: "Mật khẩu xác nhận không trùng khớp" });
          }  
          if (res.data.error === "LengthPassWord") {
              self.setState({
                LengthPassWord: "Mật khẩu có ít nhất 6 ký tự"
              });
          }
        }
    });
    /* } */
  }

  render() {
    /*  const listImage = this.state.AnhXe.map((img, key) =>
  <div className="col-4">
    <img src={img} alt={key} key={key}/>
  </div>

); */
    return (
        <div id="register" history={this.props.history}>
          <div className="wrapperRegister">
              {/* title is shared */}
              <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                      <h2 className="titleMain text-center">lái xe với H3</h2>
                      <p
                          className="text-center"
                          style={{ margin: 0, padding: 0 }}
                      >
                          <small>
                            Nhập thông tin cơ bản của bạn để bắt đầu
                          </small>
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
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorHoTen}
                          </span>
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
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorSoDienThoai}
                          </span>
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.LengthSDT}
                          </span>
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
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorBienSoXe}
                          </span>
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
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorPassWord}
                          </span>
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.LengthPassWord}
                          </span>
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
                          <span style={{color: 'red', fontStyle: 'italic'}}>{this.state.ErrorPassWordConfirm}</span> 
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.PasswordMismatch}
                          </span>
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
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorDiaChi}
                          </span>
                      </div>
                      <div className="form-group">
                          <div className="inputFile">
                            <label id="#bb">
                                {" "}
                                Ảnh đại diện bác tài
                                <input
                                  type="file"
                                  id="File"
                                  className="form-control-file inputFile"
                                  aria-describedby="fileHelpId"
                                  ref={(ref) => {
                                      this.uploadInputFile = ref;
                                  }}
                                  name="filename"
                                  onChange={this.onChangeImgSingle}
                                />
                            </label>
                          </div>
                      </div>
                      <div className="form-group text-center">
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorAnhDaiDien}
                          </span>
                      </div>
                      <div className="form-group">
                          <div className="inputFile">
                            <label id="#bb">
                                {" "}
                                Ảnh của xe
                                <input
                                  ref={(ref) => {
                                      this.uploadInput = ref;
                                  }}
                                  type="file"
                                  multiple
                                  name="filenameXe"
                                  id="FileXe"
                                  className="form-control-file inputFile"
                                  aria-describedby="fileHelpId"
                                  onChange={this.onChangeImg}
                                />
                            </label>
                          </div>
                      </div>

                      <div className="form-group text-center">
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            {this.state.ErrorAnhXe}
                          </span>
                      </div>
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
