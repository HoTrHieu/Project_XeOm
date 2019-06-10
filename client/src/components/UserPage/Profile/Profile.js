import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';
import ProfileDriver from '../../Block/ProfileDriver/ProfileDriver';

class Profile extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <ProfileDriver></ProfileDriver>
                <Footer></Footer>
            </div>
        );
    }
}

export default Profile;