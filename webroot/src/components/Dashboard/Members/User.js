import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {truncate} from "lodash";


export default class User extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
        this._showDetails = this._showDetails.bind(this);
    }

    _showDetails() {
        const { user: { id }, showUserDetails } = this.props;
        showUserDetails(id);
    }

    render() {
        const { user, disableOrEnableAccount } = this.props;

        let enableOrDisable;
        if (user.is_banned)
            enableOrDisable = <a className="dropdown-item" onClick={() => disableOrEnableAccount(user, true)}>Enable</a>
        else
            enableOrDisable = <a className="dropdown-item" onClick={() => disableOrEnableAccount(user)}>Disable</a>

        return (
                <div className="col-3 mb-3">
                    <div className={`recent-members-user ${user.is_banned ? 'is-banned' : ''}`}>
                        <div className="row">
                            <div className="col-4 pr-1">
                                <div className="image">
                                    <img
                                        src={(user && user.profile_picture) || "/no-user-image.jpg"}
                                        alt={user && user.first_name}
                                        />
                                </div>
                            </div>
                            <div className="col-7 pl-1">
                                <div className="info">
                                    <h5 className="text-capitalize">
                                        {user && truncate(user.first_name + " " + user.last_name, {length: 15, separator: '...'})}
                                    </h5>
                                    <p className="pb-0 mb-0">
                                        Trust Level: <span>0</span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-1 p-0">
                                <div className="hamburger dropdown">
                                    <FontAwesomeIcon className="dropdown-toggle" data-toggle="dropdown" icon="ellipsis-v" />
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={() => this._showDetails()}>Show details</a>
                                        {enableOrDisable}
                                    </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    showUserDetails: PropTypes.func,
};
