import React from "react";
import BaseModal from '../common/BaseModal';
import Input from '../common/Input';
import { showFlashMessage } from "../../actions/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ForgotPasswordModal extends BaseModal {

    constructor() {
        super();

        this.state = {
            email: "",
            isBusy: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * Send reset password
     * @param  {[type]} e
     * @return {void}
     */
    onSubmit() {
        const { email } = this.state;
        this.setState({ isBusy: true });
        window.http.post('reset/password/send', {email})
            .then(({data}) => {
                this.setState({ isBusy: false });
                this.props.showFlashMessage(data.message)
            })
            .catch(({data}) => {
                this.setState({ isBusy: false });
                this.props.showFlashMessage(data.error, 'error')
            });

    }

    renderHeader = () => {
        return (
            <div className="row">
                <div className="logo p-0">
                    <img src="/forgot-password.svg" width="75px"/>
                </div>
                <div className="col-lg-9 header-info p-0">
                    <h6>Forgot Password</h6>
                    <p className="text-muted">Please enter the email address registered on your account.</p>
                </div>
            </div>
        )
    };

    renderBody = () => {
        return (
            <div className="col-11 m-auto p-0">
                <Input value={this.state.email}
                    name="email"
                    placeholder="E-mail Address"
                    onChange={this.onChange}
                    />
            </div>
        )
    };

    renderFooter = () => {
        let { isBusy } = this.state;
        let isLoadingState = isBusy ? <FontAwesomeIcon icon="spinner" spin className="mr-2" /> : null;
        return (
            <div className="forgot-password-f row">
                <div className="col-12 text-right buttons p-0">
                    <button className="btn btn-white"
                        onClick={() => this.close()}>CANCEL</button>
                    <button className="btn btn-blue"
                        disabled={isBusy}
                        onClick={this.onSubmit}>
                        {isLoadingState}
                        SEND RESET PASSWORD
                    </button>
                </div>
            </div>
        )
    }
}

export default ForgotPasswordModal;
