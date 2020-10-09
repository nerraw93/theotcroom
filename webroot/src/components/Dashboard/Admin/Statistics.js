import React, { Component } from 'react';
// import _ from "lodash";
import Loading2 from "../../common/Loading2";
import cx from "classnames";
// import PropTypes from 'prop-types';

export default class Statistics extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            buy: 0,
            sell: 0,
            ongoing: 0,
            completed: 0,
            users: 0,
            isLoading: true
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            window.http.get('admin/dashboard/statistics')
                .then(({ data: { users_count, buy_orders, sell_orders, completed_orders, ongoing_orders } }) => {
                    if (this._isMounted) {
                        this.setState({ users: users_count });
                        this.setState({ buy: buy_orders });
                        this.setState({ sell: sell_orders });
                        this.setState({ completed: completed_orders });
                        this.setState({ ongoing: ongoing_orders });

                        this.setState({ isLoading: false });
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }

    }

    _renderCardBody = (image, value, label) => {
        const { isLoading } = this.state;

        return (
            <div className="statistic col-md-4 col-sm-12 col-xs-12">
                <div className="session-block">
                    {
                        isLoading
                        ? <Loading2/>
                        : <div className="media">
                            <div className={cx("img text-center", image)}>
                                <img src={`/${image}.svg`} alt=""/>
                            </div>
                            <div className="media-body">
                                <h5 className="mt-0">{value}</h5>
                                <span>{label}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    };

    render() {
        const { buy, sell, ongoing, completed, users } = this.state;
        return (
            <div className="statistics col-12 p-0">
                <div className="row">
                    <div className="col-12 text-center pl-0 pr-0">
                        <div className="row">
                            {this._renderCardBody("home-buy-orders", buy, "Buy Orders")}
                            {this._renderCardBody("home-sell-orders", sell, "Sell Orders")}
                            {this._renderCardBody("home-ongoing-deals", ongoing, "Ongoing Orders")}
                            {this._renderCardBody("home-completed-deals", completed, "Deals Completed")}
                            {this._renderCardBody("total-users", users, "Total Users")}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
