import React, { Component } from "react";
import axios from "axios";
import SideBarMobile from "../LeftSideBar/SideBarMobile";

class StatisticalAllDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similarPhone: [],
            similarPhoneDriver: [],
            similarGroup: [],
            similarPhoneData: [],
            filterBy: "date", // select filter change [date, month, week]
            dateYMD: this.getYMD(), // get current date format with "-"" character [2019-06-15]
            dateFilter: '', // get date from input date of filter by date
            dateRes: this.getYMDNotSpace(),

            rangeYear: [2017, 2018], // set default range year from 2017->2018 for map select option year
            rangeMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // set default range month from 1->12 for map select option month
            rangeWeek: [1, 2, 3, 4, 5], // set default range week from 1->5 for map select option week
            week: '1', // set default select option week value is 1
            weekMonth: new Date().getMonth() + 1, // set default select option month value is current month
            weekYear: new Date().getFullYear(), // set default select option year value is current year

            errGetData: "", // error when not similarPhone

            monthFilter: new Date().getMonth() + 1, // set default month value is current month use for filter by month
            yearFilter: new Date().getFullYear(), // set default year value is current year use for filter by month
        };
        this.onChange = this.onChange.bind(this);
    }

    getDateDMY() {/* 15/06/2019 */
        var offset = +7;
        var today = new Date(new Date().getTime() + offset * 3600 * 1000).toJSON()
        var dd = today.substr(8, 2).length < 2 ? '0' + today.substr(8, 2) : today.substr(8, 2)
        var mm = today.substr(5, 2).length < 2 ? '0' + today.substr(5, 2) : today.substr(5, 2)
        var yyyy = today.substr(0, 4);
        return dd + '/' + mm + '/' + yyyy;
    }

    getYMD() { /* 2019-06-06 */
        var offset = +7;
        var today = new Date(new Date().getTime() + offset * 3600 * 1000).toJSON()
        var dd = today.substr(8, 2).length < 2 ? '0' + today.substr(8, 2) : today.substr(8, 2)
        var mm = today.substr(5, 2).length < 2 ? '0' + today.substr(5, 2) : today.substr(5, 2)
        var yyyy = today.substr(0, 4);
        return yyyy + '-' + mm + '-' + dd;
    }

    getYMDNotSpace() { /* 20190606 */
        var offset = +7;
        var today = new Date(
            new Date().getTime() + offset * 3600 * 1000
        ).toJSON();
        var dd =
            today.substr(8, 2).length < 2
                ? "0" + today.substr(8, 2)
                : today.substr(8, 2);
        var mm =
            today.substr(5, 2).length < 2
                ? "0" + today.substr(5, 2)
                : today.substr(5, 2);
        var yyyy = today.substr(0, 4);
        return yyyy + "" + mm + "" + dd;
    }

    setRangeYear() { /* [2000,2001,2002,2003,...,current year] */
        const time = new Date().getFullYear();
        var minYear = 2000,
            maxYear = time;
        var year = [];
        for (var i = maxYear - minYear; i >= 0; i--) {
            year.push(i + minYear);
        }
        this.setState({ rangeYear: year });
    }

    formatMoney(num) { /* 2000000 => 2.000.000 */
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    async onChange(e) {
        await this.setState({
            [e.target.name]: e.target.value, change: true
        });
        if (this.state.filterBy === 'date') {// check if view by day
            if (this.state.dateFilter !== '') { // check if input day have value
                var time = new Date(this.state.dateFilter).toJSON();
                var y = time.substr(0, 4);
                var m = time.substr(5, 2);
                var d = parseInt(time.substr(8, 2));
                d = d < 10 ? '0' + d : d
                var date = y + m + d;
                this.setState({ errGetData: '' });
                this.getData('D', date);  // call function getDataGroup type D (day) and get by day/month/year
            } else {
                // if input datelFilter === null (eq: mm/dd/yyyy)
                // display format error
                this.setState({ errGetData: "Không đúng định dạng" });
                this.getData('D', this.state.dateRes);
            }
        }
        else if (this.state.filterBy === 'month') { // check if view by month
            // this.state.monthFilter : if month < 10 then month = "0" + month
            // call function getDataGroup type M (month) and get by month/year
            this.getData('M', this.state.yearFilter + ((this.state.monthFilter < 10) ? '0' + this.state.monthFilter : this.state.monthFilter));
        } else if (this.state.filterBy === 'week') { // check if view by week
            // this.state.monthFilter : if month < 10 then month = "0" + month
            // call function getDataGroup type W (week) and get by week/month/year
            this.getData('W', this.state.weekYear + '' + ((this.state.weekMonth < 10) ? ('0' + this.state.weekMonth) : (this.state.weekMonth)) + '' + this.state.week);
        }
    }

    getData(type, time) { // get data chuyendi depend on type (D, M, W) and info time of type
        const link = `http://localhost:8080/taixe/getdata/${type}/${time}`;
        console.log(link)
        axios
            .get(link)
            .then((res) => {
                const similarPhone = res.data.Similarphone;
                if (similarPhone !== '') {
                    var listPhone = []
                    var data = {}
                    similarPhone.map((item, key) => {
                        const {chuyendi, taixe} = item.SimilarPhone;
                        data = {SDTTaiXe: chuyendi.SDTTaiXe, HoTen: taixe.HoTen, BienSoXe: taixe.BienSoXe, SoKm: chuyendi.SoKm, SoTien: chuyendi.SoTien}
                        if(listPhone.findIndex(i => i.SDTTaiXe === chuyendi.SDTTaiXe)<0){
                            listPhone.push(data)
                        }else{
                            const index = listPhone.findIndex(i => i.SDTTaiXe === chuyendi.SDTTaiXe)
                            listPhone[index].SoKm = listPhone[index].SoKm + chuyendi.SoKm 
                            listPhone[index].SoTien = listPhone[index].SoTien + chuyendi.SoTien 
                            
                        }
                    })
                    console.log(listPhone)
                    this.setState({ similarPhoneData : listPhone })
                }
            })
            .catch(function (error) {
                // handle error
            })
            .finally(function () {
                // always executed
            });
    }

    getFilter = (id, type, time) => { 
        // get data chuyendi depend on id(numberPhone), type(D, M, W), time(time from input date)
        const link = `http://localhost:8080/taixe/getbyphone/${id}/${type}/${time}`;
        axios
            .get(link)
            .then((res) => {
                const similarPhone = res.data.Similarphone;
                this.setState({
                    similarPhoneDriver: similarPhone
                });
            })
            .catch(function (error) {
                // handle error
                /* console.log(error); */
            })
            .finally(function () {
                // always executed
            });
    };

    getDataGroup = (type, time) => {
        // get data chuyendi depend on type (D, M, W) and info time of type
        const link = `http://localhost:8080/taixe/getgroupbyphone/${type}/${time}`;
        console.log(link)
        axios
            .get(link)
            .then((res) => {
                const similarGroup = res.data.Similarphone;
                this.setState({
                    similarGroup: similarGroup
                });
            })
            .catch(function (error) {
                // handle error
                /* console.log(error); */
            })
            .finally(function () {
                // always executed
            });
    };


    componentDidMount() {
        this.setRangeYear();
        console.log("dateRes : " +this.state.dateRes)
        this.getData('D', this.state.dateRes)
    }

    render() {
        console.log(this.state.similarPhoneData)
        const { rangeYear, rangeMonth, rangeWeek, similarPhoneData } = this.state;
        let listDataStatiscal = "";
        if (similarPhoneData !== "") {
            listDataStatiscal = similarPhoneData.map((item, key) => (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.HoTen}</td>
                    <td>{item.SDTTaiXe}</td>
                    <td>{item.BienSoXe}</td>
                    <td>{item.SoKm}</td>
                    <td>{item.SoTien}đ</td>
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
            <div className="col-xs-12 col-md-9 statistical" id="content">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="titleMain text-center">
                                Thống Kê Tất Cả Bác Tài
                    </h2>
                        </div>
                    </div>
                    <SideBarMobile active="alldriver"></SideBarMobile>
                    <form onSubmit={this.onSubmit}>
                        <div className="row filterStatistical">
                            <div className="col-xs-12 col-md-2">
                                <div className="form-group">
                                    <select
                                        className="form-control custom-select"
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
                            <div className="col-xs-12 col-md-4">

                                {this.state.filterBy === "date" ? (
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="example-date-input"
                                            defaultValue={this.state.dateYMD}
                                            onChange={this.onChange}
                                            name="dateFilter"
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
                        </div>{" "}
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                {this.state.errGetData}
                            </div>
                        </div>
                    </form>
                    {/* filterStatistical */}
                    <div className="row listTable">
                        <div className="col-12">
                            {similarPhoneData.length !== 0 ? <div className="table-responsive">
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
                                : <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <h6><i style={{ color: 'red' }}>Không có dữ liệu phù hợp</i></h6>
                                    </div>
                                </div>}

                        </div>
                    </div>
                    {/* listTable */}
                </div>
            </div>
        );
    }
}

export default StatisticalAllDriver;