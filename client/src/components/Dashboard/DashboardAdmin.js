import { routesMain } from "../RouteMain/RouteAdmin"


//import React from 'react';
import React, { Component, Fragment, Suspense } from "react";

import { Switch, Route} from "react-router-dom"


 
class DashboardAdmin extends Component {
  
showAdmin = routesMain =>{
        let result = null
        if(routesMain.length  > 0){
            result = routesMain.map((item, index)=>
                <Route key={index} path = {item.path} exact = {item.exact} component = {item.main} />
            )
        }
        return <Suspense fallback = {<div>Loading....</div>}><Switch>{result}</Switch></Suspense>
}

  render() {
   

    return (
      <Fragment>
          {this.showAdmin(routesMain)}
        </Fragment>
    );
  }
}

export default DashboardAdmin;
