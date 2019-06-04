import React, { Component } from 'react';
import ListBacTai from '../../Block/Right-SideBar/ListDriver';
import TopBar from '../../Block/TopBar/TopBar';
import LeftSideBar from '../../Block/LeftSideBar/LeftSideBar';
import Footer from '../../Block/Footer/Footer';
class AllDrivers extends Component {
    render() {
        return (
            <div  className="wrapperContent">
                <TopBar></TopBar>
                <div className="wrapperMain">
                    <div className="container-fluid ct-f-sideBar">
                        <div className="row r-sideBar">
                        <LeftSideBar></LeftSideBar>
                        <ListBacTai/>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
             </div> 
        );
    }
}

export default AllDrivers;
