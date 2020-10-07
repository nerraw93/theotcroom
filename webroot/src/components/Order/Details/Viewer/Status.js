import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Denied({ reservation }) {

    return (
        <div className="card text-white bg-danger mb-3">
            <div className="card-body">
                <h4 className="card-title"><FontAwesomeIcon icon="exclamation-circle" size="lg" className="mr-2" /> Denied</h4>
                <p className="card-text">Your reservation has been denied.</p>
            </div>
        </div>
    )
}

Denied.propTypes = {
    reservation: PropTypes.object.isRequired,
}

export function Accepted({ reservation }) {

    return (
        <div className="card text-white bg-info mb-3">
            <div className="card-body">
                <h4 className="card-title"><FontAwesomeIcon icon="check-circle" size="lg" className="mr-2" /> Accepted</h4>
                <p className="card-text">Your reservation has been completed.</p>
            </div>
        </div>
    )
}

Accepted.propTypes = {
    reservation: PropTypes.object.isRequired,
}

export function Completed({ reservation }) {

    return (
        <div className="card text-white bg-purple-700 mb-3">
            <div className="card-body">
                <h4 className="card-title"><FontAwesomeIcon icon="handshake" size="lg" className="mr-2" /> Completed</h4>
                <p className="card-text">
                    Transaction has been completed.
                    <button type="button"
                        className="btn btn-default text-dark float-right">
                        Write a Review
                    </button>
                </p>


            </div>
        </div>
    )
}

Completed.propTypes = {
    reservation: PropTypes.object.isRequired,
}
