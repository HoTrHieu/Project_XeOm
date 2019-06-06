import React, { Component } from 'react';
import axios from 'axios'
import ItemDriver from "./itemDiver"

class ListBacTai extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taixes: [],
      similarPhone: [],
      // kichhoat: "KichHoat"
    }


  }
  componentDidUpdate() {
    this.getData()
  }
  componentWillMount() {
    this.getData();

  }

  ApiUpdate_TrangThai_KichHoat = (id) => { //update trang thai


    axios.post(`http://localhost:8080/taikhoan/update/${id}`, {
      TinhTrang: 'KichHoat',

    })
      .then(function (response) {
        /* console.log(response.data); */
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ApiUpdate_TrangThai_ChuaKichHoat = (id) => { //update trang thai


    axios.post(`http://localhost:8080/taikhoan/update/${id}`, {
      TinhTrang: 'ChuaKichHoat',

    })
      .then(function (response) {
        /* console.log(response.data); */
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getData = () => {
    const link = 'http://localhost:8080/taikhoan/api/taixe-taikhoan';
    axios.get(link)
      .then(res => {
        const similarPhone = res.data.Similarphone
        this.setState({
          similarPhone: similarPhone
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
  onUUpdate = (data, kichhoat) => {
    const id = data.SimilarPhone.taikhoan._id
    const tinhtrang = data.SimilarPhone.taikhoan.TinhTrang
    if (tinhtrang === "KichHoat") {
      this.ApiUpdate_TrangThai_ChuaKichHoat(id)
    }
    if (tinhtrang === "ChuaKichHoat") {
      this.ApiUpdate_TrangThai_KichHoat(id)
    }

    // this.ApiUpdate_TrangThai_KichHoat(id)
    // this.ApiUpdate_TrangThai_ChuaKichHoat(id)

    // this.state.similarPhone(item=>{
    //   if(item === data){
    //     this.setState({
    //       kichhoat: "ChuaKichHoat"
    //     })
    //   }
    // })
  }

  // onUpdate = (data)=>{
  //   console.log(data)
  // }

  render() {
    const { similarPhone } = this.state
    // console.log(similarPhone[0].SimilarPhone.TenTaiXe)
    // console.log(this.state.similarPhone)


    const listTaiXe = similarPhone.map((item, key) =>
      <ItemDriver key={key} item={item} similarPhone={similarPhone} kichhoat={this.state.kichhoat} onUpdate={this.onUUpdate}  />
    );
    return (
      <div className="col-9 statistical" id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2 className="titleMain text-center">
                Danh Sách Bác Tài
                    </h2>
            </div>
          </div>
        </div>
        <div className="note">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4 text-right wrapperNote ">
                <i className="far fa-check-circle check" />&nbsp; Kích Hoạt
                    </div>
              <div className="col-xs-12 col-sm-4 text-center wrapperNote">
                <i className="far fa-times-circle uncheck" />&nbsp; Chưa Kích Hoạt
                    </div>
              <div className="col-xs-12 col-sm-4 text-left wrapperNote">
                <i className="fas fa-ellipsis-v running" />&nbsp; Ðang Chạy
                    </div>
            </div>
          </div>
        </div> {/* note */}
        <div className="container">
          <div className="row">
            {listTaiXe}
          </div>
        </div>
      </div>


    );
  }
}

export default ListBacTai;
