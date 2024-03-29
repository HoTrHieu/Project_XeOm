import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';
    
import Register from '../../Block/Register/Register';
import Why from '../../Block/Why/Why';
import Useprocess from '../../Block/Useprocess/Useprocess';
import DownloadApp from '../../Block/DownloadApp/DownloadApp';

class RegisterPage extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <Register></Register>
                <Why></Why>
                <Useprocess></Useprocess>
                <DownloadApp></DownloadApp>
                <Footer></Footer>
            
            </div>
        );
    }
}

export default RegisterPage;