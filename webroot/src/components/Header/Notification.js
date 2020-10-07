import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNotifications, getNotif } from "../../actions/notification";

export default class Notification extends Component {

    _isListening = false;

    constructor() {
        super();

        this.state = {

        }

    }

    _renderNotifications(notification, index) {
        const { category } = notification
        let icon, message
        if (category == 2) {
            icon = 'comments'
            message = 'You have one reply.'
        } else if (category == 3) {
            icon = 'thumbtack'
            message = "You have new reservation."
        } else {
            icon = 'comment'
            message = 'You have new message.'
        }

        return <a key={index} className="dropdown-item" >
            <FontAwesomeIcon icon={icon} className="text-primary mr-2" />
            {message}
        </a>;
    }

    render() {
        const { auth, notifications: { unread, all } } = this.props;

        if (!auth.myself) {
            return false;
        }

        const { token, myself } = auth;
        if (myself) {
            if (myself.id !== undefined && !this._isListening) {
                this._isListening = true;
                window.broadcaster.subscribeToUserNotifcation(myself.id);
            }
        }

        return (
            <div className="dropdown notification mr-3">
                <button className="btn btn-default dropdown-toggle btn-width-auto" type="button" data-toggle="dropdown">
                    <FontAwesomeIcon icon="bell" size="lg" />
                    {unread.length > 0 ? <span className="badge badge-pill badge-warning">{unread.length}</span> : ''}
                </button>
                <div className="dropdown-menu">
                    {all.length == 0  ? <a className="dropdown-item">Nothing here.</a> : all.map(this._renderNotifications)}
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item text-center" href="#">Show All</a>
                </div>
            </div>
        )
    }
}

Notification.propTypes = {
    auth: PropTypes.object.isRequired,
};
