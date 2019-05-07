import React, { Component } from 'react';

class SalientFeatures extends Component {
    render() {
        return (
            <div id="salientFeatures">
                {/* title is shared */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="titleMain text-center">
                            những tính năng nổi bật của H3?
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>Dễ dàng đi mọi nơi cùng H3</p>
                            </div>
                        </div>
                        {/* row */}
                        <div className="row">
                            <div className="col-xs-12 col-md-5 text-xs-center text-sm-right wrapperImgPhone">
                                <img src="./templates/users/lib/images/empty-v2.png" alt="" width="70%" />
                                <div className="imgPhone">
                                    <img src="./templates/users/lib/images/1_step-1.jpg" alt="" />
                                </div>
                            </div>
                            {/* wrapperImgPhone */}
                            <div className="col-xs 12 col-md-7 text-xs-center text-sm-left wrapperInfo">
                                <div className="info">
                                    <div className="row">
                                        <div className="col-1 numberInfo">
                                            <span>1</span>
                                        </div>
                                        <div className="col-11 detailInfo">
                                            <p className="titleDetailInfo">
                                                <b>Đặt xe chỉ với 2 thao tác đơn giản</b>
                                            </p>
                                            <p>
                                                Đừng quên chọn điểm đến của bạn để nhận thông báo ước
                                                lượng về giá cước cho chuyến đi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* info */}
                                <div className="info">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-xs-1 numberInfo">
                                                <span>2</span>
                                            </div>
                                            <div className="col-xs-11 detailInfo">
                                                <p className="titleDetailInfo">
                                                    <b>Tài xế đón liền tay!</b>
                                                </p>
                                                <p>
                                                    H3 sẽ giúp bạn tìm tài xế (có xe trống) gần nhất.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* info */}
                                <div className="info">
                                    <div className="row">
                                        <div className="col-1 numberInfo">
                                            <span>3</span>
                                        </div>
                                        <div className="col-11 detailInfo">
                                            <p className="titleDetailInfo">
                                                <b>Dõi theo tài xế</b>
                                            </p>
                                            <p>
                                                Bạn có thể dõi theo di chuyển của tài xế và biết trước
                                                thời điểm bạn sẽ được ngồi lên xe!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* info */}
                                <div className="info">
                                    <div className="row">
                                        <div className="col-1 numberInfo">
                                            <span>4</span>
                                        </div>
                                        <div className="col-11 detailInfo">
                                            <p className="titleDetailInfo">
                                                <b>Kết thúc hành trình an toàn mỹ mãn</b>
                                            </p>
                                            <p>
                                                Bạn thậm chí còn có thể chia sẻ hành trình của mình với
                                                người thân để thêm phần an tâm trong chuyến đi nha!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* info */}
                            </div>
                            {/* wrapperInfo */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SalientFeatures;