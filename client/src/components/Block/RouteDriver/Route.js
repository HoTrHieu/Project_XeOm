    import React, { Component } from "react";

    class Route extends Component {
    render() {
        return (
            <div id="contentRouteDriver">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31356.67522812481!2d106.67437147917477!3d10.766478188433842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIFRwLiBIQ00!5e0!3m2!1svi!2s!4v1559716477029!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    title="mapRoute"
                />
                <div className="btnHuyChuyen">
                    <button className="btn btn-success">
                        Hủy Chuyến
                    </button>
                </div>
            </div>
        );
    }
    }

    export default Route;
