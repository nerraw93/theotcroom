import React, { Component } from "react";
import Details from "./Details";
import Loading from "../common/Loading";
import Manager from "./Seller/Manager";
import Info from "./Seller/Info";
// import Loading2 from "../common/Loading2";
import Closed from "./Closed";
import { isUndefined } from "lodash"

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ico: null,
            myself: null,
            isOwner: null,
            isLoading: true,
            isGuest: true,
            orderIsDisabled: false,
        };

        this._checkThisUserIsTheOwner = this._checkThisUserIsTheOwner.bind(this)
    }

    componentWillMount() {
        const { fetchIcoDetails, match: { params }, myself, me } = this.props;
        me()
        if (params.id) {
            fetchIcoDetails(params.id);
        }

        if (myself) {
            this.setState({ myself, isGuest: false });
        }
    }

    componentDidUpdate(prevProps) {
        const { icoDetails, myself } = this.props;
        const { processing, error } = icoDetails

        if (myself) {
            if (myself.id !== prevProps.myself.id) {
                this.setState({ myself, isGuest: false });
            }
        }

        // Check if still processing & error
        if (processing !== prevProps.icoDetails.processing && error) {
            // Error is found - ICO is `disabled`
            this.setState({ orderIsDisabled: true }, () => {
                this._checkThisUserIsTheOwner();
            });

        }

        if (icoDetails.data !== prevProps.icoDetails.data) {
            this.setState({ ico: icoDetails.data })
            // Check if this is the isOwner
            this._checkThisUserIsTheOwner()
        }
    }

    _checkThisUserIsTheOwner() {
        const { match: { params } } = this.props
        const { orderIsDisabled } = this.state

        this.setState({ isLoading: true })
        window.http.get(`order/${params.id}/check-if-owner`)
            .then(({ data }) => {
                let { isOwner } = data
                this.setState({ isOwner, isLoading: false })

                if (isOwner && orderIsDisabled && !isUndefined(data.ico)) {
                    this.setState({ ico: data.ico })
                }

            }).catch((err) => {
                this.setState({ isLoading: false })
            });
    }

    componentWillUnmount() {
        this.setState({
            isOwner: null,
            isLoading: true
        });
    }

    _renderDisabledOrder(hideExtraDetails = false) {
        return (
            <div id="details" className="col-12">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="jumbotron bg-gradient-warning">
                            <h1 className="display-4">
                                {`This order has been disabled${hideExtraDetails ? '' :  'by the owner'}.`}
                            </h1>
                            <p className="lead"></p>
                            <hr className="my-4" />
                            {hideExtraDetails ? null : <p>Contact administrator if something is wrong.</p>}
                            {hideExtraDetails ? null : <a className="btn btn-primary btn-lg" href="#/" role="button">Contact Us</a> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderOrderPage() {
        const { ico, myself, isOwner, isGuest, orderIsDisabled } = this.state;
        let icoDetails;

        if (!ico) {
            return <Loading />;
        } else {
            if (ico.is_visible === 1) {
                icoDetails = <Details ico={ico} isGuest={isGuest}
                    myself={myself} {...this.props}
                    isOwner={isOwner} />;
            }
        }

        // Right - Sidebar
        const rightSidebar = isOwner ? <Manager {...this.state}/> : <Info seller={ico.user} />

        return (
            <div id="details" className="col-12 padright-10 padleft-10">
                <div className="row">
                    {orderIsDisabled ? this._renderDisabledOrder(true) : null }
                    <Closed ref="isHiddenModal" />
                    {icoDetails}
                    {rightSidebar}
                </div>
            </div>
        );
    }

    render() {
        // const { ico, myself, isOwner, isLoading, isGuest, orderIsDisabled } = this.state;
        const { isOwner, orderIsDisabled } = this.state;

        if (orderIsDisabled && !isOwner) {
            return this._renderDisabledOrder();
        } else if (isOwner && orderIsDisabled) {
            // Order is disabled but - This user is the owner - render!
            return this._renderOrderPage()
        }

        return this._renderOrderPage()
    }
}
