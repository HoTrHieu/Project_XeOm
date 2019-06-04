import React, { Component } from 'react';
import ListBacTai from '../../Block/Right-SideBar/ListDriver'
import LeftSideBar from '../../Block/LeftSideBar/LeftSideBar';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';

class IndexAdmin extends Component {
    render() {
        return (
            <div className="wrapperContent">
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

export default IndexAdmin;

