import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { timeFromNow } from "../../../../modules/Utilities";

export function Reservation({reservation, comments, openChatModal, acceptReservation, denyReservation, completeReservation}) {
    const { users, status } = reservation
    let hasComments = comments.length > 0 ? true : false;
    let lastComment = comments[comments.length - 1]
    let statusElement;
    if (status == 'ongoing') {
        statusElement = <div className="btn-group w-100">
            <button type="button" className="btn btn-info dropdown-toggle w-100 btn-block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ACTION
            </button>
            <div className="dropdown-menu">
                <li className="dropdown-item text-info" onClick={() => acceptReservation(reservation)}>ACCEPT</li>
                <li className="dropdown-item text-danger" onClick={() => denyReservation(reservation)}>DENY</li>
            </div>
        </div>
    } else if (status == 'accepted') {
        statusElement = <div className="btn-group w-100">
            <button type="button" className="btn btn-info dropdown-toggle w-100 btn-block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ACCEPTED
            </button>
            <div className="dropdown-menu">
                <li className="dropdown-item text-primary" onClick={() => completeReservation(reservation)}>COMPLETE</li>
                <li className="dropdown-item text-danger" onClick={() => denyReservation(reservation)}>DENY</li>
            </div>
        </div>
    } else if (status == 'denied') {
        statusElement = <div className="w-100 text-capitalize text-danger font-weight-bold">denied</div>
    } else if (status == 'completed') {
        statusElement = <div className="w-100 text-capitalize text-primary font-weight-bold">complete</div>
    }


    return (
        <div className={`user-message col-lg-12 ${status}`}>
            <div className="media">
                <div className="image align-self-center mr-3">
                    <img src={users.profile_picture || "/no-user-image.jpg"} className="w-100"/>
                </div>
                <div className={cx("media-body", !hasComments && "mt-4")}>
                    <div>
                        <h5 className="mt-0 mr-3">{users.first_name} {users.last_name}</h5>
                        <span>{hasComments && timeFromNow(lastComment.created_at)}</span>
                    </div>
                    <p className="float-left w-100">
                        {hasComments && lastComment.data.message}
                    </p>
                </div>
                <div className="col-lg-3 p-0 text-center reply">
                    {hasComments && <a onClick={() => openChatModal(users, comments, reservation)} style={{ cursor: "pointer" }}>SHOW MESSAGE</a>}
                    {statusElement}

                </div>
            </div>
        </div>
    )
}

Reservation.propTypes = {
    reservation: PropTypes.object.isRequired,
    openChatModal: PropTypes.func.isRequired,
    denyReservation: PropTypes.func.isRequired,
    acceptReservation: PropTypes.func.isRequired,
    completeReservation: PropTypes.func.isRequired,
    comments: PropTypes.array,
}
