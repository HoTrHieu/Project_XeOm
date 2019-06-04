import React, { Component } from 'react';
import TopBar from '../../Block/TopBar/TopBar';
import Footer from '../../Block/Footer/Footer';
import MenuSub from '../../Block/MenuSub/MenuSub';
import StatisticalDriver from '../../Block/StatisticalDriver/StatisticalDriver';

class Statistical extends Component {
    render() {
        return (
            <div>
                <TopBar></TopBar>
                <StatisticalDriver></StatisticalDriver>
                <Footer></Footer>
                <MenuSub></MenuSub>
            </div>
        );
    }
}

export default Statistical;