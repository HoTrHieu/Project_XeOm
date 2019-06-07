    import React, { Component } from "react";
    import TopBar from "../../Block/TopBar/TopBar";
    import Confirm from "../../Block/ConfirmDriver/Confirm";
    import Footer from "../../Block/Footer/Footer";

    class ConfirmDriver extends Component {
    render() {
        return (
        <div className="wrapperDivConfirmDriver">
            <TopBar />
            <Confirm />
            <Footer />
        </div>
        );
    }
    }

    export default ConfirmDriver;
