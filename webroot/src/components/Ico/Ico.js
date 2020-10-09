import React, {Component} from "react";
import Input from "../common/Input";
import DatePicker from "react-datepicker/es";
import Textarea from "../common/Textarea";
import Cleave from "cleave.js/react";
import {Redirect} from "react-router-dom";
import cx from "classnames";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

class Ico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "buy",
            name: "",
            symbol: "",
            currency: "ETH",
            ico_price_token: "",
            selling_price_token: "",
            fee: "",
            supply: "",
            token_release_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            vesting_schedule: "",
            notes: "",
            isLoading: false,
            isSuccessful: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { icos: { creatingIco, creatingIcoSuccess, creatingIcoError } } = nextProps;

        if (creatingIco && !creatingIcoSuccess) {
            this.setState({ isLoading: true });
        }

        if (!creatingIco && !creatingIcoSuccess && creatingIcoError) {
            this.setState({ isLoading: false });
        }

        if (!creatingIco && creatingIcoSuccess && !creatingIcoError) {
            this.setState({ isLoading: false, isSuccessful: true });
        }
    }

    _handleTypeClick = (type) => {
        this.setState({ type });
    };

    _handleCurrencyClick = (currency) => {
        this.setState({ currency });
    };

    _handleDateChange = (date) => {
        this.setState({
            token_release_date: moment(date).format("YYYY-MM-DD HH:mm:ss")
        });
    };

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "ico_price_token" || name === "selling_price_token" || name === "fee" || name === "supply") {
            this.setState({
                [name]: e.target.rawValue
            });

            return;
        }

        this.setState({
            [name]: value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { createIco } = this.props;
        createIco({ ...this.state });
    };

    render() {
        let {
            type,
            name,
            symbol,
            currency,
            ico_price_token,
            selling_price_token,
            fee,
            supply,
            token_release_date,
            vesting_schedule,
            notes,
            isLoading,
            isSuccessful
        } = this.state;



        if (isSuccessful) return <Redirect push to="/"/>;

        return (
            <div id="new-ico" className="row session-block">
                <div className="col-12 p-0">
                    <div className="row form-header">
                        <div className="logo p-0">
                            <img src="/new-ico-order.svg" width="75px" alt=""/>
                        </div>
                        <div className="col-lg-9 p-0">
                            <h3>Post on ICO Order</h3>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12 p-0">
                    <div className="col-lg-10 p-0">
                        <div className="form-block">
                            <div className="inner-block">
                                <h4 className="session-title">Order Type</h4>
                                <div className="row p-o">
                                    <div className="col-lg-4">
                                        <button className={cx("btn btn-blue w-100", type === "sell" && "inactive")} onClick={() => this._handleTypeClick("buy")}>BUY</button>
                                    </div>
                                    <div className="col-lg-4">
                                        <button className={cx("btn btn-blue w-100", type === "buy" && "inactive")} onClick={() => this._handleTypeClick("sell")}>SELL</button>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-block">
                                <Input label="Name of the project" name="name" value={name} placeholder="e.g. Holochain, Rootstock" onChange={this.onChange}/>
                            </div>

                            <div className="inner-block">
                                <Input label="Symbol of the Token"
                                    name="symbol" value={symbol.toUpperCase()}
                                    placeholder="e.g. HOT, RSK"
                                    onChange={this.onChange}
                                    maxLength={4}/>
                            </div>

                            <div className="inner-block">
                                <label>Currency accepted</label>
                                <div className="col-12 radio-group">
                                    <div className="radio w-25 float-left">
                                        <input type="radio" name="currency" value="ETH"/> <span className={cx("radio-label", currency === "ETH" && "checked")} onClick={() => this._handleCurrencyClick("ETH")}>ETH</span>
                                    </div>
                                    <div className="radio w-75 float-left">
                                        <input type="radio" name="currency" value="BTC"/> <span className={cx("radio-label", currency === "BTC" && "checked")} onClick={() => this._handleCurrencyClick("BTC")}>BTC</span>
                                    </div>
                                    <div className="radio w-25 float-left">
                                        <input type="radio" name="currency" value="NEO"/> <span className={cx("radio-label", currency === "NEO" && "checked")} onClick={() => this._handleCurrencyClick("NEO")}>NEO</span>
                                    </div>
                                    <div className="radio w-75 float-left">
                                        <input type="radio" name="currency" value="USD"/> <span className={cx("radio-label", currency === "USD" && "checked")} onClick={() => this._handleCurrencyClick("USD")}>USD</span>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-block">
                                <div className="input-group mb-3">
                                    <label>ICO Price per Token</label> <br/>
                                    <Cleave name="ico_price_token" className="form-control" options={{ numeral: true, numeralThousandsGroupStyle: "thousand"}} value={ico_price_token} onChange={this.onChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">{currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-block">
                                <div className="input-group mb-3">
                                    <label>Selling Price per Token</label> <br/>
                                    <Cleave name="selling_price_token" className="form-control" options={{ numeral: true, numeralThousandsGroupStyle: "thousand"}} value={selling_price_token} onChange={this.onChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">{currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-block">
                                <div className="input-group mb-3">
                                    <label>Fee</label> <br/>
                                    <Cleave name="fee" className="form-control" options={{ numeral: true, numeralThousandsGroupStyle: "thousand"}} value={fee} onChange={this.onChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">{currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-block">
                                <div className="input-group mb-3">
                                    <label>Supply</label> <br/>
                                    <Cleave name="supply" className="form-control" options={{ numeral: true, numeralThousandsGroupStyle: "thousand"}} value={supply} onChange={this.onChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">{currency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12 p-0 right-col">
                    <div className="col-lg-9 p-0">
                        <div className="form-block">
                            <div className="inner-block date-picker">
                                <div className="input-group mb-3">
                                    <label>Token Release Date</label> <br/>
                                    <div className="datepicker-container">
                                        <DatePicker
                                            name="token_release_date"
                                            selected={moment(token_release_date)}
                                            className={cx("form-control w-100")}
                                            onChange={this._handleDateChange}
                                            dropdownMode="select"
                                            dateFormat={"DD/MM/YYYY"}
                                            />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-blue">
                                                <FontAwesomeIcon icon={faCalendar} />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="inner-block">
                                <Input label="Vesting Schedule" name="vesting_schedule" value={vesting_schedule} placeholder="e.g. 50% on release date, 20% every month for 5 months" onChange={this.onChange}/>
                            </div>

                            <div className="input-block">
                                <Textarea label="Notes" name="notes"
                                    value={notes} onChange={this.onChange}
                                    placeholder="Write down any pertinent information about this allocation to ensure a smooth transaction"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 footer">
                    <hr/>
                    <button className="btn btn-blue" disabled={isLoading} onClick={this.onSubmit}>CREATE ORDER</button>
                </div>
            </div>
        )
    }
}

export default Ico;
