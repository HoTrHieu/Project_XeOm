import React, { Component } from 'react';

class Why extends Component {
    render() {
        return (
            <div id="why">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="titleMain text-center">
                                vì sao bạn nên chọn H3?
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-xs-12 col-md-4 wrapperWhy">
                                <div className="iconWhy">
                                    <i className="fas fa-hand-holding-usd" />
                                </div>
                                {/* iconWhy */}
                                <div className="contentWhy">
                                    <h4 className="titleWhy">
                                    Tự do kiếm thêm thu nhập
                                    </h4>
                                    <p>
                                    Thu nhập ổn định tùy theo năng suất và khác nhau ở từng loại
                                    hình dịch vụ.
                                    </p>
                                </div>
                                {/* contentWhy */}
                            </div>
                            {/* wrapperWhy */}
                            <div className="col-xs-12 col-md-4 wrapperWhy">
                                <div className="iconWhy">
                                    <i className="far fa-clock" />
                                </div>
                                {/* iconWhy */}
                                <div className="contentWhy">
                                    <h4 className="titleWhy">
                                        Tự do và tự chủ về thời gian
                                    </h4>
                                    <p>
                                        Không gò bó về mặt thời gian, chính bạn là người quyết định
                                        thời gian làm việc.
                                    </p>
                                </div>
                                {/* contentWhy */}
                            </div>
                            {/* wrapperWhy */}
                            <div className="col-xs-12 col-md-4 wrapperWhy">
                                <div className="iconWhy">
                                    <i className="far fa-handshake" />
                                </div>
                                {/* iconWhy */}
                                <div className="contentWhy">
                                    <h4 className="titleWhy">
                                        Tự do gắn kết và chia sẻ
                                    </h4>
                                    <p>
                                        Thêm cơ hội được giao tiếp và kết nối với những người trong
                                        cộng đồng Grab.
                                    </p>
                                </div>
                                {/* contentWhy */}
                            </div>
                            {/* wrapperWhy */}
                        </div>
                        </div>
                </div>
                {/* content */}
            </div>

        );
    }
}

export default Why;