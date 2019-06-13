import React, { Component } from "react";
import axios from "axios";
import Content from "../StatisticalDriver/Content";
import SideBarMobile from "../LeftSideBar/SideBarMobile";
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
        change: false,
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

  formatMoney(num) { /* 2000000 => 2.000.000 */
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  async onChange(e){
    let self=this;
    await this.setState({
        HoTen : e.target.value, change: true
    });
    if(this.state.HoTen === 'none'){
      this.setState({ AnhDaiDien: '', BienSoXe: '', SoDienThoai: '' });
    }
    if(this.state.change === true){
      self.state.taixes.map((taixe) => {
        if (taixe.HoTen === self.state.HoTen) {
          self.setState({ 
            SoDienThoai: taixe.SoDienThoai,
            BienSoXe : taixe.BienSoXe, 
            AnhDaiDien : taixe.AnhDaiDien  });
        }
      });
    }

  };
  render() {
    return (
        <div className="col-xs-12 col-md-9 statistical" id="content">
          <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                    <h2 className="titleMain text-center">
                      Thống Kê Theo Bác Tài
                    </h2>
                </div>
              </div>
          </div>
          <SideBarMobile active="driver"></SideBarMobile>
          <Content show="true"></Content> 
        </div>
        
    );
  }
}

export default OneDriver;
