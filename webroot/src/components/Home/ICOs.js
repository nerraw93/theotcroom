import React, { Component } from "react";
import PropTypes from 'prop-types';
import { NavLink, withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import ReactTable from "react-table";
import moment from "moment";
import { filter, isEmpty } from "lodash";

class ICOs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };

        this._rowSelected = this._rowSelected.bind(this)
    }

    _currency = (val) => {
        return <NumberFormat thousandSeparator="," decimalSeparator="." decimalScale={2} value={val} displayType="text"/>
    };

    _chunkAds(ads) {
        let sell = [];
        let buy = [];

        if (!isEmpty(ads)) {
            sell = filter(ads, (ad) => ad.type === 'sell');
            buy = filter(ads, (ad) => ad.type === 'buy');
        }

        return { sell, buy };
    }

    _rowSelected(state, row) {
        if (row && row.row) {
            return {
                onClick: (e) => {
                    this.props.history.push(`/order/${row.original.uuid}`)
                },
            }
        }
        return {}
    }

    render() {
        const { data } = this.props;
        const { sell, buy } = this._chunkAds(data);

        const columnsSell = [{
            id: "name",
            Header: "ICO Name",
            accessor: a => <NavLink to={`/order/${a.uuid}`} className="table-row table-normal text-primary font-weight-bold">{a.name}</NavLink>
        }, {
            id: "supply",
            Header: "Supply",
            accessor: a => <span className="table-row" style={{ color: "#E29000" }}>{a.supply}</span>,
        }, {
            id: "price_per_token",
            Header: "Selling Price Per Token",
            accessor: a => <span className="table-row table-normal">{this._currency(a.selling_price_token)} {a.currency}</span>
        }, {
            id: "created_at",
            Header: "Post Date",
            accessor: a => <span className="table-row table-normal">{moment(a.created_at).format("MMMM D, YYYY")}</span>
        }, {
            id: "seller",
            Header: "Seller",
            accessor: a => <a href="#/" className="table-row table-link">{a.user.first_name} {a.user.last_name}</a>,
        }];

        const columnsBuy = [{
            id: "name",
            Header: "ICO Name",
            accessor: a => <NavLink to={`/order/${a.uuid}`} className="table-row table-normal text-primary font-weight-bold">{a.name}</NavLink>
        }, {
            id: "supply",
            Header: "Supply",
            accessor: a => <span className="table-row" style={{ color: "#E29000" }}>{a.supply}</span>,
        }, {
            id: "price_per_token",
            Header: "Buying Price Per Token",
            accessor: a => <span className="table-row table-normal">{this._currency(a.selling_price_token)} {a.currency}</span>
        }, {
            id: "created_at",
            Header: "Post Date",
            accessor: a => <span className="table-row table-normal">{moment(a.created_at).format("MMMM D, YYYY")}</span>
        }, {
            id: "buyer",
            Header: "Buyer",
            accessor: a => <a href="#/" className="table-row table-link">{a.user.first_name} {a.user.last_name}</a>,
        }];

        return(
            <div className="home-table">
                <h1 className="mb-3">Latest Sell Orders</h1>
                <ReactTable
                    className="text-center mb-3 -highlight"
                    getTrProps={this._rowSelected}
                    columns={columnsSell}
                    data={sell}
                    pageSize={10}
                    minRows={3}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                    />
                <h1 className="mb-3">Latest Buy Orders</h1>
                <ReactTable
                    className="text-center mb-3 -highlight"
                    getTrProps={this._rowSelected}
                    columns={columnsBuy}
                    data={buy}
                    pageSize={10}
                    minRows={3}
                    showPageJump={false}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                    />
            </div>
        );
    }
}

ICOs.propTypes = {
    data: PropTypes.any.isRequired
};
export default withRouter(ICOs);
