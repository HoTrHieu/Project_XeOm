import React, { Component } from 'react';
 import axios from 'axios'
class OneDriver extends Component {
  constructor(props){
    super(props)
    this.state = {
        taixes: [],
        value: "",
        SoDienThoai:"",
        BienSoXe:""
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
    onChange = (e)=>{
      this.setState({
        value : e.target.value
      })
     
    }
    render() {
      const {taixes} = this.state
      //console.log(taixes)
      
      const SoDienThoai = this.state.taixes.map((taixe, index)=>{
          if(this.state.taixes[index].HoTen === this.state.value){
            return this.state.taixes[index].SoDienThoai
          }
         
        })
     const BienSoXe =   this.state.taixes.map((taixe, index)=>{
          if(this.state.taixes[index].HoTen === this.state.value){
            return this.state.taixes[index].BienSoXe  
          }
     
        })
      
      let finIndex = (tentaixe)=>{
        let result = -1
          this.state.taixes.map((taixe, index) =>{
            if(this.state.taixes[index].HoTen === tentaixe){
               result = index
            }
          })
          return result
      }
      //console.log("index",finIndex(this.state.value))
      const listTaiXe = this.state.taixes.map((taixe, key) =>
      <option value = {taixe.HoTen} key={key}>{taixe.HoTen}</option>
    );
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
                  <div className="form-group">
                    <select className="form-control" name id>
                      <option selected>Km tăng dần</option>
                      <option>Km giảm dần</option>
                      <option>Số tiền tăng dần</option>
                      <option>Số tiền giảm dần</option>
                      <option>Số chuyến tăng dần</option>
                      <option>Số chuyến giảm dần</option>
                    </select>
                  </div>
                </div> {/* selectSort */}
                <div className="col-6 search text-center">
                  <form className="form-inline md-form form-sm">
                    <input className="form-control mr-3 w-75" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                    <i className="fas fa-search" aria-hidden="true" />
                  </form>
                </div>{/* search */}
              </div> {/* row */}
              {/* {listTaiXe} */}
              <div className="row wrapperInfoDriver" >
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-1 imgDriverStatiscal">
                      <img src="./templates/admin/lib/images/logoadmin.jpg" alt="" className="img-fluid" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 selectName">
                      <div className="form-group">
                        <select onChange = {this.onChange} value = {this.state.value} className="form-control" >
                        <option> Chọn Tên Tài Xế</option>
                          {listTaiXe}
                        </select>
                      </div>
                    </div> {/* selectName */}
                    <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                      <i className="fas fa-motorcycle" />&nbsp; {BienSoXe}
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3 infoMore">
                      <i className="fas fa-mobile-alt" />&nbsp;{SoDienThoai}
                    </div>
                  </div>
                </div>
              </div> 
            </div> {/* statisticalDriver */}
          </div>
          
            
        );
    }
}

export default OneDriver;
