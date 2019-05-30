import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class TopBarAdmin extends Component {
  render() {
    return (
      <div id="topBar">
      <div className="container">
          <div className="row">
              <div className="col-1">
                  <div className="wrapperLogo">
                      <Link to="/index-admin"><img src="./templates/users/lib/images/logo-01.png" alt="" className="img-fluid" width="100%" /></Link>
                  </div>
              </div>
              <div className="col-5">
                  <div className="titleLogo">
                      <h3>Xe Ôm Công Nghệ - H3</h3>
                  </div>
              </div>
              <div id="iconBar">
                  <i className="fas fa-bars" />
              </div>
          </div>
      </div>
    </div>
          
    );
  }
}
export default TopBarAdmin;