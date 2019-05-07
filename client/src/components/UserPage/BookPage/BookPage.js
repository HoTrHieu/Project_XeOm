import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import DownloadApp from '../../Block/DownloadApp/DownloadApp';
import Footer from '../../Block/Footer/Footer';
import MenuSub from '../../Block/MenuSub/MenuSub';
import Blook from '../../Block/Blook/Blook';
import Why from '../../Block/Why/Why';
import Useprocess from '../../Block/Useprocess/Useprocess';

class Book_page extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <Blook></Blook>
                <Why></Why>
                <Useprocess></Useprocess>
                <DownloadApp></DownloadApp>
                <Footer></Footer>
                <MenuSub></MenuSub>
            </div>
        );
    }
}

export default Book_page;