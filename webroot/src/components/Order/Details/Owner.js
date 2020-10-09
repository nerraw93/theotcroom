import React, { Component } from "react";
import Loading2 from "../../common/Loading2";
import { Reservation } from "./Owner/Reservation";
import ChatModal from "../Comment/Owner/ChatModal";
import PropTypes from "prop-types";
import { filter } from 'lodash'
import ConfirmDialog from "../../common/ConfirmDialog";

export default class Owner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            conversations: [],
            isLoading: true,
            replyToReservationId: null,
            buyer: null,
            reservationAction: {
                isShowConfirmDialog: false,
                message: '',
                type: null,
                id: null
            }
        };

        this._getReservationComments = this._getReservationComments.bind(this)
        this._acceptReservation = this._acceptReservation.bind(this)
        this._denyReservation = this._denyReservation.bind(this)
        this._confirmReserveAction = this._confirmReserveAction.bind(this)
        this._cancelReserveAction = this._cancelReserveAction.bind(this)
        this._completeReservation = this._completeReservation.bind(this)
    }

    componentDidMount() {
        if (this.props.userReservations.length)
            this._getReservationComments()
    }

    _getReservationComments() {
        const { ico } = this.props
        window.http.get(`order/${ico.uuid}/comments`)
            .then(({ data: { comments } }) => {
                this.setState({ isLoading: false, comments })
            }).catch(({ data }) => {
                window.alert.error(data.error)
            });
    }

    _renderReservations = () => {
        const { userReservations } = this.props;
        const { isLoading, comments } = this.state;

        if (isLoading) {
            return <Loading2 />
        } else if (userReservations.length === 0) {
            return <div className="user-message col-lg-12">
                <h4 className="text-center">No reservations made yet.</h4>
            </div>
        } else {
            return userReservations.map((reservation) => {
                // Get user comments
                let userComments = filter(comments, (comment) => comment.reservation_id === reservation.id)

                return <Reservation key={reservation.id}
                    reservation={reservation} comments={userComments}
                    acceptReservation={this._acceptReservation}
                    denyReservation={this._denyReservation}
                    completeReservation={this._completeReservation}
                    openChatModal={this._openChatModal} />
            })
        }
    };

    _completeReservation({ id }) {
        this.setState({ reservationAction: {
            isShowConfirmDialog: true,
            message: 'Are you sure you want to complete this reservation?',
            type: 'complete',
            id
        }})
    }

    _denyReservation({ id }) {
        this.setState({ reservationAction: {
            isShowConfirmDialog: true,
            message: 'Are you sure you want to deny this reservation?',
            type: 'deny',
            id
        }})
    }

    _acceptReservation({ id }) {
        this.setState({ reservationAction: {
            isShowConfirmDialog: true,
            message: 'Are you sure you want to accept this reservation?',
            type: 'accept',
            id
        }})
    }

    _confirmReserveAction() {
        const { reservationAction: { type, id } } = this.state
        const { ico: { uuid }, refreshReservations } = this.props

        window.http.post(`order/${uuid}/reservation/${type}`, { reservation_id: id })
            .then(({ data }) => {
                this._cancelReserveAction()
                window.alert.success(data.message)
                refreshReservations()
            }).catch(({data}) => {
                window.alert.error(data.error)
            });
    }

    _cancelReserveAction() {
        this.setState({ reservationAction: {
            isShowConfirmDialog: false,
            message: '',
            type: null,
            id: null
        }})
    }

    _openChatModal = (buyer, conversations, {id}) => {
        const { chatModal } = this.refs;
        this.setState({buyer, conversations, replyToReservationId: id})
        chatModal.setClass("chat-modal");
        chatModal.open();
    };

    _sendMessage = (message) => {
        if (message.length > 0) {
            const { writeComments, match: { params } } = this.props;
            writeComments(params.id, { message });
        }
    };

    render() {
        const { conversations, buyer, replyToReservationId, reservationAction } = this.state;
        const { myself, ico } = this.props;
        let reservationType = '';
        if (reservationAction.type === 'deny')
            reservationType = 'danger';
        else if (reservationAction.type === 'accept')
            reservationType = 'info';
        else if (reservationAction.type === 'complete')
            reservationType = 'primary';
        return (
            <div className="col-lg-12">
                <ConfirmDialog cancel={this._cancelReserveAction} confirm={this._confirmReserveAction}
                    isShow={reservationAction.isShowConfirmDialog} type={reservationType} message={reservationAction.message} />
                <ChatModal ref="chatModal" myself={myself} reservationId={replyToReservationId}
                    comments={conversations} buyer={buyer} ico={ico}
                    getReservationComments={this._getReservationComments}/>
                <h3>Reservations</h3>
                {this._renderReservations()}
            </div>
        )
    }
}

Owner.propTypes = {
    userReservations: PropTypes.array,
};
