import React, { Component } from "react";
// import _ from "lodash";
import Comment from "../Comment/Comment";
import RegisterModal from "../../Home/RegisterModal";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import ConfirmDialog from "../../common/ConfirmDialog";
import { Button } from "../../common/Button";
import { Denied, Accepted, Completed } from "./Viewer/Status";

export default class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isAlreadyReserved: false,
            isShowReserveConfirmation: false,
        };

        this._guestUserReserveIsClick = this._guestUserReserveIsClick.bind(this)
        this._handleCancelReservation = this._handleCancelReservation.bind(this)
        this._reserveButtonIsClick = this._reserveButtonIsClick.bind(this)
    }

    componentDidMount() {
        const { reservation } = this.props;

        if (!isEmpty(reservation)) {
            // This user already has reservation
            this.setState({ isAlreadyReserved: true });
        }
    }

    componentDidUpdate(prevProps) {
        const { reservation } = this.props;
        if (!isEmpty(reservation) && !this.state.isAlreadyReserved) {
            this.setState({ isAlreadyReserved: true });
        }
    }

    _guestUserReserveIsClick() {
        const { registerModal } = this.refs;
        registerModal.setClass("register-modal");
        registerModal.open();
    }

    _handleCancelReservation() {
        this.setState({ isShowReserveConfirmation: false });
    }

    _reserveButtonIsClick() {
        this.setState({ isShowReserveConfirmation: true });
    }

    _handleReserveClick = () => {
        const { reserveSubmit, match: { params } } = this.props;
        this.setState({ isShowReserveConfirmation: false });
        reserveSubmit(params.id);
    };

    _registerUser(form) {
        window.http.post(`register`, form)
            .then(({ data }) => {
                window.alert.success(data.message);
            }).catch(({ data }) => {
                window.alert.error(data.error);
            });
    }

    _renderButtons = () => {
        const { isLoading, isAlreadyReserved } = this.state;
        const { isGuest, isReserveActionIsBusy, reservation } = this.props;
        const { status } = reservation

        // User is guest - force to register
        if (isGuest) {
            return <button className="btn btn-blue" onClick={this._guestUserReserveIsClick} disabled={isLoading}>RESERVE</button>
        }

        if (!isAlreadyReserved) {
            return <Button isLoading={isReserveActionIsBusy} type={'blue'} label={'reserve'} isCapitalize
                onClick={this._reserveButtonIsClick} />
        }

        // Check reservation `status`
        if (status === 'denied') {
            // Reservation is `denied`
            return <Denied reservation={reservation} />
        } else if (status === 'accepted') {
            // Reservation is `accepted`
            return <div>
                <Accepted reservation={reservation} />
                <Comment {...this.props}/>
            </div>;
        } else if (status === 'ongoing') {
            // Reservation is `ongoing`
            return <div>
                <button className="btn btn-blue" disabled>YOU GOT THIS</button>
                <Comment {...this.props}/>
            </div>
        } else if (status === 'completed') {
            // Reservation is `completed`
            return <div>
                <Completed reservation={reservation} />
                <Comment {...this.props}/>
            </div>
        }


    };

    render() {
        const { auth } = this.props;
        const { isShowReserveConfirmation, isAlreadyReserved } = this.state;

        return (
            <div className="col-lg-12">
                {this._renderButtons()}
                { !isAlreadyReserved ?
                    <ConfirmDialog cancel={this._handleCancelReservation} confirm={this._handleReserveClick}
                        isShow={isShowReserveConfirmation} message={'Do you want to proceed with the reservation?'} />
                    : null
                }
                <RegisterModal ref="registerModal" register={this._registerUser} auth={auth} />
            </div>
        )
    }
}

Viewer.propTypes = {
    reservation: PropTypes.object,
};
