import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Loading2 from "../../common/Loading2";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Chart extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            labels: [],
            data: [],
            from: moment().subtract(7, 'days').format("YYYY-MM-DD"),
            to: moment().format("YYYY-MM-DD"),
            isLoading: true
        }

        this._handleDateToChange = this._handleDateToChange.bind(this)
        this._handleDateFromChange = this._handleDateFromChange.bind(this)
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted)
            this._fetchUsersByDate();
    }

    _handleDateFromChange(date){
        this.setState({
            from: moment(date).format("YYYY-MM-DD"),
        }, () => {
            this._fetchUsersByDate();
        });
    };

    _handleDateToChange(date) {
        this.setState({
            to: moment(date).format("YYYY-MM-DD"),
        }, () => {
            this._fetchUsersByDate();
        });
    };

    _fetchUsersByDate = () => {
        this.setState({ isLoading: true });
        let { from, to } = this.state;
        window.http.get('admin/dashboard/users', {
            from, to
        }).then(({ data: { data } }) => {
            let date = [];
            let counts = [];
            for (let {label, count} of data) {
                date.push(label);
                counts.push(count);
            }
            if (this._isMounted) {
                this.setState({ labels: date });
                this.setState({ data: counts });
                this.setState({ isLoading: false });
            }

            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    render() {
        const { labels, data, from, to, isLoading } = this.state;
        let elementWidth = 0;
        if (document.getElementById('box-get-width')) {
            elementWidth = document.getElementById('box-get-width').clientWidth;
        }

        const chartData = {
            labels: labels,
            datasets: [
                {
                    fontSize: 16,
                    borderColor: "#f2994a",
                    backgroundColor: "#fef9ed",
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "#fff",
                    data: data
                }
            ]
        };

        const chartOptions = {
            legend: false,
            elements: {
                line: {
                    tension: 0
                },
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 14,
                        padding: 20,
                        beginAtZero: true,
                        stepSize: 1
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 14,
                        padding: 20
                    }
                }]
            },
            layout: {
                padding: {
                    left: 30,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            }
        };

        return (
            <div className="weekly-users session-block row">
                <div className="col-3 dates">
                    <h3>Weekly Users</h3>
                </div>
                <div className="offset-3 col-3 pr-0 ">
                    <div className="inner-block date-picker">
                        <div className="input-group mb-3">
                            <label>Date from</label>
                            <div className="datepicker-container">
                                <DatePicker
                                    name="from"
                                    selected={moment(from)}
                                    className="form-control w-100"
                                    onChange={this._handleDateFromChange}
                                    dropdownMode="select"
                                    dateFormat={"YYYY-MM-DD"}
                                    />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-blue">
                                        <FontAwesomeIcon icon="calendar" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 ">
                    <div className="inner-block date-picker">
                        <div className="input-group mb-3">
                            <label>Date to</label>
                            <div className="datepicker-container">
                                <DatePicker
                                    name="to"
                                    selected={moment(to)}
                                    className="form-control w-100"
                                    onChange={this._handleDateToChange}
                                    dropdownMode="select"
                                    dateFormat={"YYYY-MM-DD"}
                                    />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-blue">
                                        <FontAwesomeIcon icon="calendar" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12" id="box-get-width">
                    <div className="chart w-100" >
                        { isLoading ? <Loading2/> : <Line
                            data={chartData}
                            options={chartOptions}
                            height={170}
                            width={elementWidth}
                            />
                        }
                    </div>
                </div>

            </div>
        )
    }
}
