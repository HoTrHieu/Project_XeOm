import React, { Component } from "react";
import axios from "axios";
class OneDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
        taixes: [],
        HoTen: "none",
        SoDienThoai: "",
        BienSoXe: "",
        change: false,
        similarPhone: [],
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(){
  }
  getData = () => {
    const link = "http://localhost:8080/taixe/";
    axios
        .get(link)
        .then((res) => {
          const taixes = res.data.taixe;
          this.setState({
              taixes: taixes
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
  };
  getDataByPhone(phone){
    const link = "http://localhost:8080/taixe/getbyphone/" + phone;
    console.log(link)
    axios
        .get(link)
        .then((res) => {
          const similarPhone = res.data.Similarphone;
          if(similarPhone!== ''){
              this.setState({
                  similarPhone: similarPhone
              });
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .finally(function() {
          // always executed
        });
  }

  formatMoney(num) { /* 2000000 => 2.000.000 */
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  async onChange(e){
    await this.setState({
        HoTen : e.target.value, change: true
    });
    if(this.state.HoTen === 'none'){
      this.setState({ AnhDaiDien: '', BienSoXe: '', SoDienThoai: '' });
    }
    this.state.taixes.map((taixe) => {
      if (taixe.HoTen === this.state.HoTen) {
        this.setState({ 
          SoDienThoai : taixe.SoDienThoai, 
          BienSoXe : taixe.BienSoXe, 
          AnhDaiDien : taixe.AnhDaiDien  });
        this.getDataByPhone(taixe.SoDienThoai)
      }
    });
  };
  render() {
    const { similarPhone } = this.state;
    let listDataStatiscal = "";
    if (similarPhone !== "") {
        listDataStatiscal = similarPhone.map((item, key) => (
        <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.SimilarPhone.taixe.HoTen}</td>
            <td>{item.SimilarPhone.taixe.SoDienThoai}</td>
            <td>{item.SimilarPhone.taixe.BienSoXe}</td>
            <td>{item.SimilarPhone.chuyendi.SoKm}</td>
            <td>{this.formatMoney(item.SimilarPhone.chuyendi.SoTien)}đ</td>
        </tr>
        ));
    } else {
        this.setState({ errGetData: "Không có dữ liệu phù hợp" });
    } 
    const listTaiXe = this.state.taixes.map((taixe, key) => (
        <option value={taixe.HoTen} key={key}>
          {taixe.HoTen}
        </option>
    ));
    return (
        <div className="col-9 statistical" id="content">
          <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                    <h2 className="titleMain text-center">
                      Thống Kê Theo Bác Tài
                    </h2>
                </div>
              </div>
          </div>
          <div className="container statisticalDriver">
              <div className="row">
                <div className="col-6 selectSort">
                    &nbsp;
                </div>{" "}
                {/* selectSort */}
                <div className="col-6 search text-center">
                    <form className="form-inline md-form form-sm">
                      <input
                          className="form-control mr-3 w-75"
                          type="text"
                          placeholder="Tìm kiếm"
                          aria-label="Search"
                      />
                      <i className="fas fa-search" aria-hidden="true" />
                    </form>
                </div>
                {/* search */}
              </div>{" "}
              {/* row */}
              {/* {listTaiXe} */}
              <div className="row wrapperInfoDriver">
                <div className="container">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-1 imgDriverStatiscal">
                          <img
                            src={this.state.AnhDaiDien ? this.state.AnhDaiDien : "./templates/users/lib/images/user.png"}
                            alt="img"
                            className="img-fluid"
                          />
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-4 selectName">
                          <div className="form-group">
                            <select
                                onChange={this.onChange}
                                value={this.state.HoTen}
                                name ="HoTen"
                                className="form-control"
                            >
                                <option value="none"> Chọn Tên Tài Xế</option>
                                {listTaiXe}
                            </select>
                          </div>
                      </div>{" "}
                      {/* selectName */}
                      <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                          {this.state.HoTen !== 'none' ? ('Biển Số : ' + this.state.BienSoXe) : ""}
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                          {this.state.HoTen !== 'none' ? ('SĐT : ' + this.state.SoDienThoai) : ""}
                      </div>
                    </div>
                </div>
              </div>
              <hr/>
              {this.state.HoTen === 'none' ? <h6><i style={{color: "red"}}>Vui lòng chọn tài xế</i></h6> : ''}
              <div className="row listTable">
                <div className="col-12">
                    {this.state.taixes.length !== 0 ?   <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Họ Tên</th>
                                <th>Điện Thoại</th>
                                <th>Biển Số Xe</th>
                                <th>Số KM</th>
                                <th>Số Tiền</th>
                            </tr>
                        </thead><tbody>{listDataStatiscal}</tbody></table>
                    </div>
                    : <div className="row justify-content-center">
                    <div className="col-auto">
                    <h6><i style={{color: 'red'}}>Không có dữ liệu phù hợp</i></h6>
                    </div>
                    </div>}

                </div>
            </div>
            {/* listTable */}
          </div>{" "}
          {/* statisticalDriver */}
        </div>
    );
  }
}

export default OneDriver;
