import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import ReactTable from "react-table";
import NumberFormat from "react-number-format";
import Loading2 from "../../common/Loading2";
import { debounce } from "lodash";
import ConfirmDialog from "../../common/ConfirmDialog";

export default class Orders extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            isLoading: true,
            type: 'all',
            dialogMessage: '',
            isShowDialog: false,
            actionIsDisable: false,
            orderId: null, // Id to be disable / enable
        };

        this._searchOrders = this._searchOrders.bind(this);
        this._toggleEnableDisableDialog = this._toggleEnableDisableDialog.bind(this);
        this._disableOrEnableOrderConfirm = this._disableOrEnableOrderConfirm.bind(this);
        this._disableOrEnableOrderCancel = this._disableOrEnableOrderCancel.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted)
            this._fetchOrders();
    }

    _searchOrders = (e) => {
        e.persist();

        if (!this.debouncedFn) {
            this.debouncedFn = debounce(() => {
                const { value } = e.target;

                this.setState({ isLoading: true, orders: [], search: value });
                if (value.length > 2)
                    this._fetchOrders(this.state.type, value)
                else
                    this._fetchOrders(this.state.type)

            }, 1000);
        }
        this.debouncedFn();
    }

    _fetchOrders(type = 'all', search = '') {
        this.setState({ isLoading: true, type });
        window.http.get('admin/dashboard/orders', { type, search })
            .then(({ data: {orders} }) => {
                if (this._isMounted) {
                    this.setState({ orders });
                    this.setState({ isLoading: false });
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log('error', error);
            });
    }

    _filterOrders(type) {
        this.setState({ type });
        this._fetchOrders(type);
    }

    _currency = (val) => {
        return <NumberFormat thousandSeparator="," decimalSeparator="." decimalScale={2} value={val} displayType="text"/>
    };

    _toggleEnableDisableDialog({id, is_visible}) {
        let actionIsDisable = false;
        let type = 'enable';

        if (is_visible) {
            // Disable this order
            actionIsDisable = true;
            type = 'disable';
        }
        let dialogMessage = `Are you sure you want to ${type} this order?`;

        this.setState({ orderId: id, isShowDialog: true, actionIsDisable, dialogMessage });
    }

    _disableOrEnableOrderConfirm() {
        const { orderId, actionIsDisable, type } = this.state;
        window.http.post(`admin/order/${orderId}/${actionIsDisable ? 'disable' : 'enable'}`).then(({ data }) => {
                window.alert.success(data.message);
                this._disableOrEnableOrderCancel();
                this._fetchOrders(type);
            })
            .catch(({data}) => {
                window.alert.error(data.error);
            });
    }

    _disableOrEnableOrderCancel() {
        this.setState({ orderId: null, isShowDialog: false, actionIsDisable: false });
    }

    render() {
        const { type, orders, isLoading, isShowDialog, dialogMessage } = this.state;

        const columns = [
            {
                id: "name",
                Header: "ICO Name",
                accessor: a => <NavLink to={`/order/${a.uuid}`} className="table-row table-normal text-info">{a.name}</NavLink>
            }, {
                id: "type",
                Header: "Type",
                accessor: a => <span className="text-uppercase font-weight-bold">{a.type}</span>
            },{
                id: "supply",
                Header: "Supply",
                accessor: a => <span className="table-row" style={{ color: "#E29000" }}>{a.supply}</span>,
            }, {
                id: "price_per_token",
                Header: "Selling Price Per Token",
                accessor: a => <span className="table-row table-normal">{this._currency(a.selling_price_token)} PHP</span>
            }, {
                id: "created_at",
                Header: "Post Date",
                accessor: a => <span className="table-row table-normal">{moment(a.created_at).format("MMMM D, YYYY")}</span>
            }, {
                id: "action",
                Header: 'Action',
                accessor: order =>
                <div>
                    <p>
                        <button className={ order.is_visible ? "btn btn-sm btn-warning" : "btn btn-sm btn-info" }
                            onClick={() => this._toggleEnableDisableDialog(order)}>{order.is_visible ? 'Disable' : 'Enable'}</button>
                    </p>
                </div>
            }

        ];

        return (
            <div className="recent-orders session-block row">
                <ConfirmDialog cancel={this._disableOrEnableOrderCancel} confirm={this._disableOrEnableOrderConfirm}
                    isShow={isShowDialog} message={dialogMessage}/>
                <div className="col-12 p-0">
                    <div className="row">
                        <div className="col-6 p-0 text-left">
                            <div className="img float-left">
                                <img src="/orders.svg" alt=""/>
                            </div>
                            <h3>Recent Orders</h3>
                        </div>
                        <div className="col-6 p-0 ml-auto text-right">
                            <NavLink to="/order/new"
                                className="btn btn-primary"
                                onClick={this._openMembersModal}>
                                CREATE ORDER
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-12 p-0 mt-5">
                    <ul className="app-nav nav">
                        <li className="nav-item" onClick={() => this._filterOrders('all')}>
                            <span className={`nav-link ${type === 'all' ? 'active' : ''}`}>All Orders</span>
                        </li>
                        <li className="nav-item" onClick={() => this._filterOrders('sell')}>
                            <span className={`nav-link ${type === 'sell' ? 'active' : ''}`}>Sell Orders</span>
                        </li>
                        <li className="nav-item" onClick={() => this._filterOrders('buy')}>
                            <span className={`nav-link ${type === 'buy' ? 'active' : ''}`}>Buy Orders</span>
                        </li>
                    </ul>
                </div>
                <div className="col-12 mt-4 p-0">
                    <div className="search">
                        <input type="text" name="search" className="form-control" placeholder="Search here..." onChange={this._searchOrders}/>
                    </div>
                </div>
                <div className="col-12 p-0">
                    {
                        isLoading
                        ? <Loading2 />
                        : <ReactTable className="text-center"
                            columns={columns}
                            data={orders}
                            pageSize={10}
                            useRowSelect
                            minRows={3}
                            showPageJump={false}
                            showPageSizeOptions={false}
                            showPaginationBottom={false}
                        />
                    }
                </div>
            </div>
        )
    }
}
