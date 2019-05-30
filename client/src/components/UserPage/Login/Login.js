import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import WrapperLogin from '../../Block/WrapperLogin/WrapperLogin';
import Footer from '../../Block/Footer/Footer';
import MenuSub from '../../Block/MenuSub/MenuSub';

class Login extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <WrapperLogin></WrapperLogin>
                <Footer></Footer>
                
            </div>
        );
    }
}

export default Login;