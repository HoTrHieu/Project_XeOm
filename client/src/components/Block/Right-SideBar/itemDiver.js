import React, { Component } from 'react';
 
 
 
class ItemDriver extends Component {
  constructor(props){
    super(props)
    this.state = {
        taixes: [],
        similarPhone: [],
        // kichhoats : this.props.item.SimilarPhone.taikhoan.TinhTrang
    } 
    
  
  }
  onUpdate = ()=>{
   this.props.onUpdate(this.props.item, this.state.kichhoats)
  }
   
    render() {
  //     const { similarPhone } = this.props
  //    console.log("props",this.props.similarPhone)
  //    const listTaiXe = similarPhone.map((item, key) =>
  //    <div className="col-xs-12 col-md-6 wrapperDriver" key={key}>
  //    <div className="driver">
  //      <div className="container">
  //        <div className="row" >
  //          <div className="col-2 imgDriver">
  //            <img src="./templates/users/lib/images/administrator-male.png" alt="#" className="img-fluid" />
  //          </div>
  //          <div className="col-8 info">
  //            <p><b>{item.SimilarPhone.taixe.HoTen}</b></p>
  //            <p><i>{item.SimilarPhone.taixe.BienSoXe}</i></p>
  //          </div>
  //          <div className= { item.SimilarPhone.taikhoan.TinhTrang === this.props.kichhoat ? "col-2 status check" : "col-2 status uncheck" } onClick = { this.onUpdate} >
  //            <i className={ item.SimilarPhone.taikhoan.TinhTrang === this.props.kichhoat ? "far fa-check-circle check" : "far fa-times-circle uncheck" } />
             
  //         </div>
  //          {/* <div className= "col-2 status uncheck">
  //            <i className="far fa-times-circle uncheck" />
             
  //          </div>
  //          <div className= "col-2 status check">
  //            <i className="far fa-check-circle check" />
             
  //          </div>  */}
  //        </div>
  //      </div>
  //    </div>
  //  </div>
  //  );
        return (
        
                <div className="col-xs-12 col-md-6 wrapperDriver" >
                  <div className={this.props.item.SimilarPhone.taixe.TinhTrang === "Online" ? "driver check" : "driver"}>  
                    <div className="container">
                      <div className="row" >
                        <div className="col-2 imgDriver">
                          <img src={this.props.item.SimilarPhone.taixe.AnhDaiDien? this.props.item.SimilarPhone.taixe.AnhDaiDien: "./templates/users/lib/images/user.png"}  className="img-fluid" />
                        </div>
                        <div className="col-8 info">
                          <p><b>{this.props.item.SimilarPhone.taixe.HoTen}</b></p>
                          <p><i>{this.props.item.SimilarPhone.taixe.BienSoXe}</i></p>
                        </div>
                        <div className= {this.props.item.SimilarPhone.taikhoan.TinhTrang === "KichHoat" ? "col-2 status check" : "col-2 status uncheck" } onClick = { this.onUpdate} >
                          <i className={this.props.item.SimilarPhone.taikhoan.TinhTrang === "KichHoat" ? "far fa-check-circle check" : "far fa-times-circle uncheck" } />
                          
                        </div>
                        {/* <div className= "col-2 status uncheck">
                          <i className="far fa-times-circle uncheck" />
                          
                        </div>
                        <div className= "col-2 status check">
                          <i className="far fa-check-circle check" />
                          
                        </div>  */}
                      </div>
                    </div>
                  </div>
                </div>
           
           
        );
    }
}

export default ItemDriver;
