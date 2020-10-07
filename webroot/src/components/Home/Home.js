import React, { Component } from "react";
import Search from "./Search";
import ICOs from './ICOs';
import Statistics from './Statistics';
import _ from "lodash";
import "react-table/react-table.css";
import { debounce } from "lodash";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            ads: [],
            total_buy_orders: 0,
            total_sell_orders: 0,
            total_ongoing_orders: 0,
            total_completed_orders: 0,
            searchKey: ''
        }

        this._search = this._search.bind(this);
    }

    componentDidMount() {
        const { fetchAds, countReservations } = this.props;
        fetchAds();
        countReservations();
    }

    componentWillReceiveProps(nextProps) {
        const { ads: { ads }, reservations } = nextProps;

        if (ads) {
            let ongoing = _.filter(reservations, { status: 'ongoing' });
            let completed = _.filter(reservations, { status: 'completed' });

            this.setState({
                ads,
                total_buy_orders: _.filter(ads, { type: 'buy' }).length,
                total_sell_orders: _.filter(ads, { type: 'sell' }).length,
                total_ongoing_orders: ongoing.length > 0 ? ongoing[0].total : 0,
                total_completed_orders: completed.length > 0 ? completed[0].total : 0
            });
        }
    }

    _search(e) {
        e.persist();

        if (!this.debouncedFn) {
            this.debouncedFn = debounce(() => {
                const { fetchAds } = this.props;
                let name = e.target.value;

                if (name.length > 2)
                    fetchAds(name);
                else
                    fetchAds();

            }, 1000);
        }
        this.debouncedFn();
    };

    render() {
        const { ads, total_buy_orders, total_sell_orders, total_ongoing_orders, total_completed_orders, searchKey } = this.state;

        return (
            <div>
                <Search search={this._search} searchKey={searchKey}/>
                <ICOs data={ads}/>
                <Statistics buy={total_buy_orders} sell={total_sell_orders} ongoing={total_ongoing_orders} completed={total_completed_orders}/>
            </div>
        )
    }
}

export default Home;
