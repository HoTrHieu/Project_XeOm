import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import LeftSidebar from '../../Block/Left-SideBar/Left-SideBar'
import ListBacTai from '../../Block/Right-SideBar/ListDriver'

class IndexAdmin extends Component {
    render() {
        return (
            <div >
                <TopBar/>
                 <div className="wrapperMain">
                    <div className="container-fluid ct-f-sideBar">
                        <div className="row r-sideBar">
                        <LeftSidebar/>
                        <ListBacTai/>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default IndexAdmin;

