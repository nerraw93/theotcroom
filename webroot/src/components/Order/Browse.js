import React, { Component } from "react";
import Tabs from "../common/Tabs";
import HideOrderModal from "./HideOrderModal";
import Loading2 from "../common/Loading2";
import ReactTable from "react-table";
import moment from "moment";
// import _ from "lodash";

class Browse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: "all_orders",
            orders: [],
            isLoading: true
        };

    }

    componentWillMount() {
        const { myOrders } = this.props;
        myOrders();
    }

    componentWillReceiveProps(nextProps) {
        const { orders } = nextProps;

        if (orders) {
            this.setState({
                orders: orders.orders,
                isLoading: false
            })
        }
    }

    _handleClickTableChange = (tab) => {
        this.setState({
            tab,
            data: this.state[tab]
        });
    };

    _showToggleHideShowOrderModal = (order) => {
        const { hideOrderModal } = this.refs;
        hideOrderModal.open(order);
    }

    render() {
        const { tab, orders, isLoading } = this.state;

        const { toggleIcoHideShow } = this.props;
        const tabs = [
            { display_name: `All Orders`, name: "all_orders" },
        ];

        if (isLoading) {
            return <Loading2/>
        }

        var btnXs = {
            padding: '1px 5px',
            fontSize: '12px',
            lineHeight: '1.5',
            borderRadius: '3px',
            width: 'auto',
            height: 'auto',
        };

        const columns = [{
            id: "name",
            Header: null,
            accessor: order => <div>
                <small>ICO Name</small>
                <p>{order.name}</p>
            </div>
        }, {
            id: "type",
            Header: null,
            minWidth: 40,
            accessor: order => <div>
                <small>Type</small>
                <p><strong className="text-uppercase">{order.type}</strong></p>
            </div>
        }, {
            id: "symbol",
            minWidth: 40,
            Header: null,
            accessor: order => <div>
                <small>Symbol</small>
                <p>{order.symbol}</p>
            </div>
        }, {
            id: "currency",
            minWidth: 40,
            Header: null,
            accessor: order => <div>
                <small>Currency</small>
                <p>{order.currency}</p>
            </div>
        }, {
            id: "ico_price_token",
            Header: null,
            accessor: order => <div>
                <small>ICO Price per token</small>
                <p>{order.ico_price_token}</p>
            </div>
        }, {
            id: "selling_price_token",
            Header: null,
            accessor: order => <div>
                <small>Selling price per token</small>
                <p>{order.selling_price_token}</p>
            </div>
        }, {
            id: "supply",
            Header: null,
            accessor: order => <div>
                <small>Supply</small>
                <p>{order.supply}</p>
            </div>
        }, {
            id: "created_at",
            Header: null,
            minWidth: 70,
            accessor: order => <div>
                <small>Date Created</small>
                <p>{moment(order.created_at).format("MM/D/YY")}</p>
            </div>
        }, {
            id: "action",
            Header: null,
            accessor: order => <div>
                <small>Action</small>
                <p>
                    <button className={ order.is_visible ? "btn btn-xs btn-info" : "btn btn-xs btn-warning" } style={btnXs}
                        onClick={() => this._showToggleHideShowOrderModal(order)}>{order.is_visible ? 'Hide' : 'Show'}</button>
                </p>
            </div>
        }

        ];

        return (
            <div id="browse-members" className="session-block row">
                <div className="col-12">
                    <Tabs
                        tabs={tabs}
                        selected={tab}
                        onClick={this._handleClickTableChange}
                    />
                    <ReactTable
                        className="text-center"
                        columns={columns}
                        data={orders}
                        pageSize={10}
                        minRows={3}
                        showPageJump={false}
                        showPageSizeOptions={false}
                        showPaginationBottom={false}
                    />
                    <HideOrderModal ref="hideOrderModal" toggleIcoHideShow={toggleIcoHideShow}/>
                </div>
            </div>
        )
    }
}

export default Browse;
