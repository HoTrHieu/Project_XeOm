import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Route from '../../Block/RouteDriver/Route';
import Footer from '../../Block/Footer/Footer';

class RouteDriver extends Component {
    render() {
        return (
            <div className="wrapperDivRouteDriver">
                <TopBar></TopBar>
                <Route></Route>
                <Footer></Footer>
            </div>
        );
    }
}

export default RouteDriver;