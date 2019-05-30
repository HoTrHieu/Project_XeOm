import React, { Component } from 'react';
import LeftSidebar from '../../Block/Left-SideBar/Left-SideBar';
import ListBacTai from '../../Block/Right-SideBar/ListDriver';
import TopBarAdmin from '../../Block/TopBarAdmin/TopBarAdmin';
class AllDrivers extends Component {
    render() {
        return (
            <div >
                <TopBarAdmin/>
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

export default AllDrivers;
