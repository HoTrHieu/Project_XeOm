import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';
import MenuSub from '../../Block/MenuSub/MenuSub';
import WrapperMain from '../../Block/WrapperMain/WrapperMain';

class Profile extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <WrapperMain></WrapperMain>
                <Footer></Footer>
                <MenuSub></MenuSub>
            </div>
        );
    }
}

export default Profile;