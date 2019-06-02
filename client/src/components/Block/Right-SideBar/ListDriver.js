import React, { Component } from 'react';
import axios from 'axios'
 
class ListBacTai extends Component {
  constructor(props){
    super(props)
    this.state = {
        taixes: [],
  
    } 
    
     
  }
  componentWillMount(){
    this.getData();
 } 
  getData = () =>{
      const link = 'http://localhost:8080/taixe/';
      axios.get(link)
      .then( res=> {
          const taixes = res.data.taixe
          this.setState({
              taixes: taixes
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

    render() {
        const listTaiXe = this.state.taixes.map((taixe, key) =>
          <div className="col-xs-12 col-md-6 wrapperDriver" key={key}>
          <div className="driver">
            <div className="container">
              <div className="row" >
                <div className="col-2 imgDriver">
                  <img src="./templates/users/lib/images/administrator-male.png" alt="#" className="img-fluid" />
                </div>
                <div className="col-8 info">
                  <p><b>{taixe.HoTen}</b></p>
                  <p><i>{taixe.BienSoXe}</i></p>
                </div>
                <div className={taixe.TinhTrang === 'Offline'? "col-2 status uncheck":"col-2 status check"}>
                  <i className={taixe.TinhTrang === 'Offline'? "far fa-times-circle uncheck":"far fa-check-circle"} />
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      <i className="fas fa-ellipsis-v running" />&nbsp; Đang Chạy
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
