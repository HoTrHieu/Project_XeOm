import React, { Component } from 'react';
import LeftSideBar from '../../Block/Left-SideBar/Left-SideBar';
import OneDriver from '../../Block/Right-SideBar/OneDrive';
import TopBarAdmin from '../../Block/TopBarAdmin/TopBarAdmin';

class Driver extends Component {
    render() {
        return (
            <div>
                <TopBarAdmin/>
                <div className="wrapperMain">
                    <div className="container-fluid ct-f-sideBar">
                        <div className="row r-sideBar">
                            <LeftSideBar/>
                            <OneDriver/>
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

export default Driver;
