import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Side from '../../Block/Slide/Side';
import SalientFeatures from '../../Block/SalientFeatures/SalientFeatures';
import FirstH3 from '../../Block/FirstH3/FirstH3';
import DownloadApp from '../../Block/DownloadApp/DownloadApp';
import Footer from '../../Block/Footer/Footer';

class Index extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <Side></Side>
                <SalientFeatures></SalientFeatures>
                <FirstH3></FirstH3>
                <DownloadApp></DownloadApp>
                <Footer></Footer>
            </div>
        );
    }
}

export default Index;