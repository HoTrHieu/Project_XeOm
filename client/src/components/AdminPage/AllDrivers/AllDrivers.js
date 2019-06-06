import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import LeftSideBar from '../../Block/LeftSideBar/LeftSideBar';
import Footer from '../../Block/Footer/Footer';
import StatisticalAllDriver from '../../Block/StatisticalDriver/StatisticalAllDriver';
class AllDrivers extends Component {
    render() {
        return (
            <div  className="wrapperContent">
                <TopBar></TopBar>
                <div className="wrapperMain">
                    <div className="container-fluid ct-f-sideBar">
                        <div className="row r-sideBar">
                        <LeftSideBar></LeftSideBar>
                        <StatisticalAllDriver></StatisticalAllDriver>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
             </div> 
        );
    }
}

export default AllDrivers;
