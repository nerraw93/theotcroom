import React from "react";
import BaseModal from '../common/BaseModal';
import Input from '../common/Input';

export default class RegisterModal extends BaseModal {
    constructor() {
        super();

        this.state = {
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
            isLoading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { auth: { registering, registerSuccess } } = nextProps;

        if (registering && !registerSuccess) {
            this.setState({ isLoading: true });
        }

        if ((!registering && registerSuccess) || (!registering && !registerSuccess)) {
            this.setState({ isLoading: false });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { register } = this.props;
        register({ ...this.state });
    };

    renderHeader = () => {
        return (
            <div className="row">
                <div className="logo p-0">
                    <img src="/register.svg" width="75px" alt=""/>
                </div>
                <div className="col-lg-9 header-info p-0">
                    <h6>Register to OTC Room</h6>
                    <p className="text-muted">Fill in the required fields below</p>
                </div>
            </div>
        )
    }

    renderBody = () => {
        const { first_name, last_name, email, password, confirm_password } = this.state;

        return (
            <div className="col-11 m-auto p-0">
                <div className="row">
                    <div className="col">
                        <Input
                            name="first_name"
                            value={first_name}
                            onChange={this.onChange}
                            placeholder="First Name"
                            />
                    </div>
                    <div className="col">
                        <Input
                            name="last_name"
                            value={last_name}
                            onChange={this.onChange}
                            placeholder="Last Name"
                            />
                    </div>
                </div>
                <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="E-mail Address"
                    />
                <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    placeholder="Password"
                    />
                <Input
                    type="password"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                    />
                <div className="form-group agreement">
                    <div className="col">
                        <span>By clicking the button below you agree to the OTC <a href="#/">Terms and Condition</a></span>
                    </div>
                </div>
            </div>
        )
    }

    renderFooter = () => {
        const { isLoading } = this.state;

        return (
            <div className="row">
                <div className="col-12 text-right buttons p-0" style={{marginBottom: 30}}>
                    <button
                        className="btn btn-white"
                        onClick={() => this.close()}
                        disabled={isLoading}>CANCEL</button>
                    <button
                        className="btn btn-blue"
                        onClick={this.onSubmit}
                        disabled={isLoading}>REGISTER</button>
                </div>
            </div>
        )
    }
}
