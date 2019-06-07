import React, { Component } from "react";
import TopBar from "../../Block/TopBar/TopBar";
import Footer from "../../Block/Footer/Footer";
import Find from "../../Block/FindDriver/Find";

    class FindDriver extends Component {
    render() {
        return (
        <div className="wrapperDivFindDriver">
            <TopBar></TopBar>
            <Find></Find>
            <Footer></Footer>
        </div>
        );
    }
    }

    export default FindDriver;
