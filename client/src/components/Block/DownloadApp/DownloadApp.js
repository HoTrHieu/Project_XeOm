import React, { Component } from 'react';

class DownloadApp extends Component {
    render() {
        return (
            <div id="downloadApp" style={{backgroundImage: 'url("./templates/users/lib/images/dg-dl-grab-back.jpg")'}}>
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-xs-10 col-md-6 text-center">
                            <h1>
                            Tải ứng dụng H3
                            </h1>
                            <div className="row">
                                <div className="col-6 text-right imgQRCode">
                                    <p>Quét mã QR</p>
                                    <img src="./templates/users/lib/images/pax_vn.jpg" alt="" width="50%" />
                                </div>
                                <div className="col-1">
                                    <div className="line" />
                                </div>
                                <div className="col-5 text-left imgAppPhone">
                                    <a href={'/'}>
                                        <img src="./templates/users/lib/images/app-store.png" alt="" width="60%" className="m-2" />
                                    </a>
                                    <a href={'/'}>
                                        <img src="./templates/users/lib/images/google-play.png" alt="" width="60%" className="m-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DownloadApp;