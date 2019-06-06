import React, { Component } from 'react';
/* import LeftSideBar from '../../Block/Left-SideBar/Left-SideBar'; */
import OneDriver from '../../Block/Right-SideBar/OneDrive';
import TopBar from '../../Block/TopBar/TopBar';
import LeftSideBar from '../../Block/LeftSideBar/LeftSideBar';
import Footer from '../../Block/Footer/Footer';

class Driver extends Component {
    render() {
        return (
            <div className="wrapperContent">
                <TopBar></TopBar>
                <div className="wrapperMain">
                    <div className="container-fluid ct-f-sideBar">
                        <div className="row r-sideBar">
                            <LeftSideBar active="driver"></LeftSideBar>
                            <OneDriver/>
                        </div>
                    </div>  
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Driver;
