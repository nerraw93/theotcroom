import React, { Component } from "react";
// import {merge} from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            form: {
                password: '',
                password_confirmation: '',
                token: ''
            },
            isBusy: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this._submit = this._submit.bind(this)
    }

    componentDidMount() {
        const { match: { params: { token } } } = this.props
        this.setState({ form: { ...this.state.form, token} })
    }

    handleChange(e) {
        this.setState({form: { ...this.state.form, [e.target.name]: e.target.value}})
    }

    _submit() {
        const { form } = this.state;
        this.setState({ isBusy: true });

        window.http.post('reset/password', form)
            .then(({data}) => {
                this.setState({ isBusy: false });
                this.props.showFlashMessage(data.message)

                this.props.history.push('/')
            })
            .catch(({data}) => {
                this.setState({ isBusy: false });
                this.props.showFlashMessage(data.error, 'error')
            });
    }

    render() {
        let { form: { password, password_confirmation } } = this.state;

        let isLoadingState = this.state.isBusy ? <FontAwesomeIcon icon="spinner" spin className="mr-2" /> : null;

        return (
            <div className="container-app mt-5 h-100 d-inline-block">
            <div className="row">
                <div className="col-xs-12">
                    <div className="media">
                        <img className="mr-3" src="/forgot-password.svg" alt="Generic placeholder" />
                        <div className="media-body">
                            <form>
                            <h2 className="mt-1">Reset Password</h2>
                            <div className="form-group mt-4 mb-3">
                                <input type="password" name="password" style={{width: '25rem'}} className="form-control form-control-lg"
                                    value={password} onChange={this.handleChange} autoComplete="off" placeholder="Enter password" />
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control form-control-lg"
                                    value={password_confirmation} onChange={this.handleChange} name="password_confirmation" placeholder="Re-type password" />
                            </div>
                            <div className="form-group mb-0 text-right">
                                <button type="button" onClick={this._submit}
                                    className="btn btn-blue btn-lg">
                                    {isLoadingState}
                                    Reset
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        )
    }
}
