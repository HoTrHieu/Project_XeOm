import React, { Component } from "react";
import axios from "axios";

class StatisticalAllDriver extends Component {
constructor(props) {
    super(props);
    this.state = {
        similarPhone: [],
        filterBy: "date",
        dateFilter: this.getDate(),
        rangeYear: [2017, 2018],
        rangeMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        rangeWeek: [1, 2, 3, 4, 5],
        dateRes: new Date().toJSON().slice(0, 10).replace(/[-T:]/g, ""),
        errGetData: "",
        change: false,

        monthFilter : new Date().getMonth() + 1,
        yearFilter : new Date().getFullYear(),
        week:'',
        weekMonth:'',
        weekYear:''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}
getDate() {
    /* 2019-06-06 */
    var today = new Date().toJSON();
    var dd = today.substr(8,2).length < 2 ? '0' + today.substr(8,2) :  today.substr(8,2) 
    var mm = today.substr(5,2).length < 2 ? '0' + today.substr(5,2) : today.substr(5,2)
    var yyyy = today.substr(0,4)
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}
setRangeYear() {
    const time = new Date().getFullYear();
    var minYear = 2000,
        maxYear = time;
    var year = [];
    for (var i = maxYear - minYear; i >= 0; i--) {
        year.push(i + minYear);
    }
    this.setState({ rangeYear: year });
}
componentDidMount() {
    this.setRangeYear();
    if(this.state.change === false){
        if(this.state.filterBy === 'date'){
            this.getInfoTaiXeByDate(this.state.dateRes)
        } 
    }
}
async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value, change: true
    });
    if(this.state.filterBy === 'date'){
        var time = new Date(this.state.dateFilter).toJSON();
        /* 2019-05-14T17:00:00.000Z */
        var y = time.substr(0,4);
        var m = time.substr(5,2);
        var d =  parseInt(time.substr(8,2)) + 1 ;
        d  = d < 10 ? '0'+ d: d
        var date = y+m+d; 
        this.getInfoTaiXeByDate(date); 
    }
    else if(this.state.filterBy === 'month'){
        var y =  this.state.yearFilter;
        var m = this.state.monthFilter < 10 ? '0' + this.state.monthFilter: this.state.monthFilter
        var date = y + m;
        this.getInfoTaiXeByMonth(date)
    }else if(this.state.filterBy === 'week'){
        alert('week')
    }

}
onSubmit(e){
    e.preventDefault();
    if(this.state.filterBy === 'date'){
        var time = new Date(this.state.dateFilter).toJSON();
        /* 2019-05-14T17:00:00.000Z */
        var y = time.substr(0,4);
        var m = time.substr(5,2);
        var d =  parseInt(time.substr(8,2)) + 1 ;
        d  = d < 10 ? '0'+ d: d
        var date = y+m+d; 
        this.getInfoTaiXeByDate(date); 
    } else if(this.state.filterBy === 'month'){
        var y =  this.state.yearFilter;
        var m = this.state.monthFilter < 10 ? '0' + this.state.monthFilter: this.state.monthFilter
        var date = y + m;
        this.getInfoTaiXeByMonth(date)
    }
    
}
getInfoTaiXeByDate(times) {
    const link =
        "http://localhost:8080/taixe/api/taixe-chuyendi-date/" + times;
    console.log(link)
    axios
        .get(link)
        .then((res) => {
        const similarPhone = res.data.Similarphone;
        if(similarPhone!== ''){
            this.setState({
                similarPhone: similarPhone
            });
        }
        })
        .catch(function(error) {
        // handle error
        })
        .finally(function() {
        // always executed
        });
}
getInfoTaiXeByMonth(times) {
    const link =
        "http://localhost:8080/taixe/api/taixe-chuyendi-month/" + times;
    console.log(link)
    axios
        .get(link)
        .then((res) => {
        const similarPhone = res.data.Similarphone;
        if(similarPhone!== ''){
            this.setState({
                similarPhone: similarPhone
            });
        }
        })
        .catch(function(error) {
        // handle error
        })
        .finally(function() {
        // always executed
        });
}
getInfoTaiXeByWeek(times) {
    const link =
        "http://localhost:8080/taixe/api/taixe-chuyendi-week/" + times;
    console.log(link)
    axios
        .get(link)
        .then((res) => {
        const similarPhone = res.data.Similarphone;
        if(similarPhone!== ''){
            this.setState({
                similarPhone: similarPhone
            });
        }
        })
        .catch(function(error) {
        // handle error
        })
        .finally(function() {
        // always executed
        });
}
render() {
    const { similarPhone, rangeYear, rangeMonth, rangeWeek } = this.state;
    let listDataStatiscal = "";
    if (similarPhone !== "") {
        listDataStatiscal = similarPhone.map((item, key) => (
        <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.SimilarPhone.taixe.HoTen}</td>
            <td>{item.SimilarPhone.taixe.SoDienThoai}</td>
            <td>{item.SimilarPhone.taixe.BienSoXe}</td>
            <td>{item.SimilarPhone.chuyendi.SoKm}</td>
            <td>{item.SimilarPhone.chuyendi.SoTien}</td>
        </tr>
        ));
    } else {
        this.setState({ errGetData: "Không có dữ liệu phù hợp" });
    }

    const listYear = rangeYear.map((year, key) => (
        <option value={year} key={key}>
        {year}
        </option>
    ));
    const listMonth = rangeMonth.map((month, key) => (
        <option value={month} key={key}>
        {month}
        </option>
    ));
    const listWeek = rangeWeek.map((week, key) => (
        <option value={week} key={key}>
        {week}
        </option>
    ));

    return (
        <div className="col-sm-9 statistical" id="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="titleMain text-center">
                    Thống Kê Tất Cả Bác Tài
                    </h2>
                </div>
            </div>
            <form onSubmit={this.onSubmit}>
            <div className="row filterStatistical">
                <div className="col-xs-12 col-md-2">
                    <div className="form-group">
                    <select
                        className="form-control"
                        name="filterBy"
                        id=""
                        style={{ width: "100%" }}
                        onChange={this.onChange}
                        value={this.state.filterBy}
                    >
                        <option value="date">Ngày</option>
                        <option value="month">Tháng</option>
                        <option value="week">Tuần</option>
                    </select>
                    </div>
                </div>
                <div className="col-xs-12 col-md-3">
                    
                    {this.state.filterBy === "date" ? (
                        <div className="form-group">
                            {/* <input
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                defaultValue={this.state.dateFilter}
                                onChange={this.onChange}
                                name="dateFilter"
                            /> */}
                            <input
                                className="form-control"
                                type="text"
                                id="example-date-input"
                                defaultValue={this.state.dateFilter}
                                onChange={this.onChange}
                                name="dateFilter"
                                placeholder="05/23/2019 {mm/dd/yyyy}"
                            />
                        </div>
                    ) : this.state.filterBy === "month" ? (
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                <select
                                    className="form-control"
                                    name="monthFilter"
                                    id=""
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    value={this.state.monthFilter}
                                >
                                    <option disabled>Chọn tháng</option>
                                    {listMonth}
                                </select>
                                </div>
                                <div className="col-6">
                                <select
                                    className="form-control"
                                    name="yearFilter"
                                    id=""
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    value={this.state.yearFilter}
                                >
                                    <option disabled>Chọn năm</option>
                                    {listYear}
                                </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="form-group">
                            <div className="row">
                                <div className="col-4">
                                <select
                                    className="form-control"
                                    name="week"
                                    id=""
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    value={this.state.week}
                                >
                                    <option disabled>Chọn tuần</option>
                                    {listWeek}
                                </select>
                                </div>
                                <div className="col-4">
                                <select
                                    className="form-control"
                                    name="weekMonth"
                                    id=""
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    value={this.state.weekMonth}
                                >
                                    <option disabled>Chọn tháng</option>
                                    {listMonth}
                                </select>
                                </div>
                                <div className="col-4">
                                <select
                                    className="form-control"
                                    name="weekYear"
                                    id=""
                                    style={{ width: "100%" }}
                                    onChange={this.onChange}
                                    value={this.state.weekYear}
                                >
                                    <option disabled>Chọn năm</option>
                                    {listYear}
                                </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-xs-12 col-md-2">
                    <button
                    type="submit"
                    className="btn btn-block btn-success"
                    >
                    Tìm kiếm
                    </button>
                </div>
            </div>{" "}
            </form>
            {/* filterStatistical */}
            <div className="row listTable">
                <div className="col-12">
                     {similarPhone.length !== 0 ?   <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>STT</th>
                                <th>Họ Tên</th>
                                <th>Điện Thoại</th>
                                <th>Biển Số Xe</th>
                                <th>Số KM</th>
                                <th>Số Tiền</th>
                            </tr>
                        </thead><tbody>{listDataStatiscal}</tbody></table>
                    </div>
                    : <h6><i>Không có dữ liệu phù hợp</i></h6>}

                </div>
            </div>
            {/* listTable */}
        </div>
        </div>
    );
}
}

export default StatisticalAllDriver;
