import React from "react";
import BaseModal from '../common/BaseModal';

export default class Closed extends BaseModal {
    renderBody = () => {

        return (
            <div className="confirm-modal text-center">
                <img src="/login-lock.svg"/>
                <h3>Oops!</h3>
                <p>
                This page was been disabled. Please contact admins.
                </p>
            </div>
        )
    }
}
