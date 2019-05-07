import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';
import MenuSub from '../../Block/MenuSub/MenuSub';
import WrapperMainTK from '../../Block/WrapperMainTK/WrapperMainTK';

class Statistical extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <WrapperMainTK></WrapperMainTK>
                <Footer></Footer>
                <MenuSub></MenuSub>
            </div>
        );
    }
}

export default Statistical;