import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Viewer from "./Details/Viewer";
import Owner from "./Details/Owner";
import Loading2 from "../common/Loading2";

export default class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reservations: [],
            isOwner: false,
            isReserveActionIsBusy: false
        }

        this._reserveSubmit = this._reserveSubmit.bind(this)
        this._getReservationData = this._getReservationData.bind(this)
    }

    componentDidMount() {
        const { ico, isGuest } = this.props;

        if (isGuest) {
            this.setState({ isLoading: false })
        } else {
            this._getReservationData()
        }
    }

    componentDidUpdate(prevProps) {
        const { isGuest } = this.props

        if (isGuest !== prevProps.isGuest) {
            if (!isGuest) {
                this.setState({ isLoading: true })
                this._getReservationData()
            } else {
                this.setState({ isLoading: false })
            }
        }
    }

    _getReservationData() {
        const { ico } = this.props;

        // Get reservation data
        window.http.get(`order/${ico.uuid}/reservations`)
            .then(({ data: { isOwner, reservations }}) => {
                this.setState({ reservations, isOwner, isLoading: false })
            }).catch(({data}) => {
                window.alert.error(data.error);
            });
    }

    _reserveSubmit(id) {
        this.setState({ isReserveActionIsBusy: true })

        window.http.post(`order/${id}/reservation/store`)
            .then(({ data }) => {
                this.setState({ isReserveActionIsBusy: false })
                this._getReservationData()
                window.alert.success(data.message)
            }).catch(({ data }) => {
                window.alert.error(data.error)
            });
    }

    _showDetails = () => {
        const { isLoading, reservations, isOwner, isReserveActionIsBusy } = this.state;

        if (isLoading) {
            return <div className="m-auto"><Loading2 /></div>;
        } else if (isOwner) {
            return <Owner {...this.props} refreshReservations={this._getReservationData} userReservations={reservations} />;
        } else {
            let reservation = {};
            if (reservations.length > 0)
                reservation = reservations[0];

            return <Viewer {...this.props} reservation={reservation}
                isReserveActionIsBusy={isReserveActionIsBusy}
                reserveSubmit={this._reserveSubmit} />;
        }
    };

    _icoInfo = (ico) => {

        return (
            <div className="session-block">
                <div className="row p-0">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <h3 className="pitch-black bold">Deal Info</h3>
                        <div className="info-session">
                            <p className="number">{ico.supply} {ico.symbol}</p>
                            <p>Number of tokens</p>
                        </div>
                        <div className="info-session">
                            <p className="number">{ico.ico_price_token}</p>
                            <p>Price per tokens</p>
                        </div>
                        <div className="info-session">
                            <p className="number">{ico.currency}</p>
                            <p>Payment accepted</p>
                        </div>
                        <div className="info-session">
                            <p className="number">{ico.type.toUpperCase()}</p>
                            <p>Type</p>
                        </div>
                        <div className="info-session notes mb-5">
                            <p className="title">Details</p>
                            <p className="body text-muted">
                                {ico.notes}
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <small className="text-muted">Date posted</small>
                        <p>{moment(ico.created_at).format("MMMM D, YYYY")}</p>
                    </div>
                </div>

                <div className="row p-0">
                    {this._showDetails()}
                </div>
            </div>
        );
    };

    render() {

        const { ico } = this.props;
        const { isLoading } = this.state;

        return (
            <div className="deal-info col-lg-8">
                {this._icoInfo(ico)}
            </div>
        )
    }
}

Details.propTypes = {
    ico: PropTypes.object.isRequired,
    isGuest: PropTypes.bool.isRequired,
    myself: PropTypes.object
};

Details.defaultProps = {};
