import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import LeftSideBar from '../../Block/Left-SideBar/Left-SideBar';
import OneDriver from '../../Block/Right-SideBar/OneDrive';

class Driver extends Component {
    render() {
        return (
            <div>
                <TopBar/>
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
