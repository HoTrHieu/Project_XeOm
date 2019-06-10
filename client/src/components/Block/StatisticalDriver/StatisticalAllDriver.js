import React, { Component } from "react";
import axios from "axios";

class StatisticalAllDriver extends Component {
constructor(props) {
    super(props);
    this.state = {
        similarPhone: [],
        similarPhoneDriver: [],
        similarGroup: [],
        filterBy: "date", // select filter change [date, month, week]
        dateYMD: this.getYMD(), // get current date format with "-"" character [2019-06-15]
        dateFilter: '', // get date from input date of filter by date
        dateRes: this.getYMDNotSpace(), 

        rangeYear: [2017, 2018], // set default range year from 2017->2018 for map select option year
        rangeMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // set default range month from 1->12 for map select option month
        rangeWeek: [1, 2, 3, 4, 5], // set default range week from 1->5 for map select option week
        week:'1', // set default select option week value is 1
        weekMonth: new Date().getMonth() + 1, // set default select option month value is current month
        weekYear: new Date().getFullYear(), // set default select option year value is current year
        
        errGetData: "", // error when not similarPhone

        monthFilter : new Date().getMonth() + 1, // set default month value is current month use for filter by month
        yearFilter : new Date().getFullYear(), // set default year value is current year use for filter by month
    };
    this.onChange = this.onChange.bind(this);
}

getDate() {/* 15/06/2019 */
    var offset = +7;
    var today = new Date( new Date().getTime() + offset * 3600 * 1000).toJSON()
    var dd = today.substr(8,2).length < 2 ? '0' + today.substr(8,2) :  today.substr(8,2) 
    var mm = today.substr(5,2).length < 2 ? '0' + today.substr(5,2) : today.substr(5,2)
    var yyyy = today.substr(0,4);
    console.log(dd + '/' + mm + '/' + yyyy);
    return dd + '/' + mm + '/' + yyyy; 
}

getYMD() { /* 2019-06-06 */
    var offset = +7;
    var today = new Date( new Date().getTime() + offset * 3600 * 1000).toJSON()
    var dd = today.substr(8,2).length < 2 ? '0' + today.substr(8,2) :  today.substr(8,2) 
    var mm = today.substr(5,2).length < 2 ? '0' + today.substr(5,2) : today.substr(5,2)
    var yyyy = today.substr(0,4);
    return yyyy + '-' + mm + '-' + dd;
}

getYMDNotSpace() { /* 20190606 */
    var offset = +7;
    var today = new Date( new Date().getTime() + offset * 3600 * 1000).toJSON()
    var dd = today.substr(8,2).length < 2 ? '0' + today.substr(8,2) :  today.substr(8,2) 
    var mm = today.substr(5,2).length < 2 ? '0' + today.substr(5,2) : today.substr(5,2)
    var yyyy = today.substr(0,4);
    return yyyy + '' + mm + '' + dd;
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

componentDidMount() {
    this.getDate();
    this.setRangeYear();
}

async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value, change: true
    });
    if(this.state.filterBy === 'date'){
        if(this.state.dateFilter!== ''){
            var time = new Date(this.state.dateFilter).toJSON();
            var y = time.substr(0,4);
            var m = time.substr(5,2);
            var d =  parseInt(time.substr(8,2)) ;
            d  = d < 10 ? '0'+ d: d
            var date = y+m+d; 
            this.setState({ errGetData : '' });
            this.getDataGroup('D', date); 
        }else{
            console.log('ddd : ' + this.state.dateRes)
            this.getDataGroup('D', this.state.dateRes)
        }
    }
    else if(this.state.filterBy === 'month'){
        this.getDataGroup('M',this.state.yearFilter  + ((this.state.monthFilter < 10) ? '0' + this.state.monthFilter: this.state.monthFilter)); 
        /* this.getInfoTaiXeByMonth(this.state.yearFilter  + ((this.state.monthFilter < 10) ? '0' + this.state.monthFilter: this.state.monthFilter)) */
    }else if(this.state.filterBy === 'week'){
        this.getDataGroup('W',this.state.weekYear+''+((this.state.weekMonth < 10) ? ('0' + this.state.weekMonth) : (this.state.weekMonth))+''+this.state.week);
        /* this.getInfoTaiXeByWeek(this.state.weekYear+''+((this.state.weekMonth < 10) ? ('0' + this.state.weekMonth) : (this.state.weekMonth))+''+this.state.week);  */
    }
}
getDate(times, type) {
    let link = 'http://localhost:8080/taixe/getdata/' + type + '&' + times;
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
getFilter = (id, type, time) => {
    const link = `http://localhost:8080/taixe/getbyphone/${id}/${type}/${time}`;
    console.log(link);
    axios
        .get(link)
        .then((res) => {
        const similarPhone = res.data.Similarphone;
        this.setState({
            similarPhoneDriver: similarPhone
        });
        })
        .catch(function(error) {
        // handle error
        console.log(error);
        })
        .finally(function() {
        // always executed
        });
};
getDataGroup = (type, time) => {
    const link = `http://localhost:8080/taixe/getgroupbyphone/${type}/${time}`;
    console.log(link);
    axios
        .get(link)
        .then((res) => {
        const similarGroup = res.data.Similarphone;
        this.setState({
            similarGroup: similarGroup
        });
        })
        .catch(function(error) {
        // handle error
        console.log(error);
        })
        .finally(function() {
        // always executed
        });
};
render() {
    const { similarPhone, rangeYear, rangeMonth, rangeWeek, similarGroup } = this.state;
    let listDataStatiscal = "";
    if (similarGroup !== "") {
        listDataStatiscal = similarGroup.map((item, key) => (
       <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.SimilarPhone.taixe._id.HoTen}</td>
            <td>{item.SimilarPhone.taixe._id.SoDienThoai}</td>
            <td>{item.SimilarPhone.taixe._id.BienSoXe}</td>
            <td>{item.SimilarPhone.taixe.totalKmHoanThanh}</td>
            <td>{item.SimilarPhone.taixe.totalSoTien}đ</td>
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
                    {similarGroup.length !== 0 ?   <div className="table-responsive">
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
                    <h6><i style={{color: 'red'}}>Không có dữ liệu phù hợp</i></h6>
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
