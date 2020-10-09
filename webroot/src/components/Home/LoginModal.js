import React from "react";
import BaseModal from '../common/BaseModal';
import Input from '../common/Input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginModal extends BaseModal {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth: { loggingIn, loginSuccess } } = nextProps;

    if (loggingIn && !loginSuccess) {
      this.setState({ isLoading: true });
    }

    if ((!loggingIn && loginSuccess) || (!loggingIn && !loginSuccess)) {
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

    const { login } = this.props;
    const { email, password } = this.state;

    login({ email, password });
  };

  handleKeyPress = (e) => {
     if (e.charCode === 13) {
         this.onSubmit(e);
     }
  };

  _handleOpenRegisterModal = () => {
    const { openRegisterModal } = this.props;
    openRegisterModal();
    this.close();
  };

  _handleOpenForgotPasswordModal = () => {
    const { openForgotPasswordModal } = this.props;
    openForgotPasswordModal();
    this.close();
  };

  renderHeader = () => {
    return (
      <div className="row">
        <div className="logo p-0">
          <img src="/login-lock.svg" width="75px" alt=""/>
        </div>
        <div className="col-lg-9 header-info p-0">
          <h6>Welcome to OTC Room</h6>
          <p className="text-muted">Enter your login details below  </p>
        </div>
      </div>
    )
  };

  renderBody = () => {
    const { email, password } = this.state;

    return (
      <div className="col-11 m-auto p-0">
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
          onKeyPress={this.handleKeyPress}
          placeholder="Password"
        />
      </div>
    )
  };

  renderFooter = () => {
    const { isLoading } = this.state;
    let isLoadingState = isLoading ? <FontAwesomeIcon icon="spinner" spin className="mr-2" /> : null;

    return (
      <div className="row">
        <div className="col-12 text-right buttons p-0">
          <button
            className="btn btn-white"
            onClick={() => this.close()}
            disabled={isLoading}>CANCEL</button>
          <button
            className="btn btn-blue"
            onClick={this.onSubmit}
            disabled={isLoading}>
            {isLoadingState}
            {isLoading ? `LOGGING IN` : 'LOGIN'}
        </button>
        </div>
        <div className="col-12 p-0 links">
          <div className="row">
            <div className="col text-left">
              <span className="text-muted">Don't have an account? <a href="#/" disabled={isLoading} onClick={this._handleOpenRegisterModal}>CREATE HERE</a></span>
            </div>
            <div className="col text-right">
              <a href="#/" disabled={isLoading} onClick={this._handleOpenForgotPasswordModal}>FORGOT PASSWORD</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginModal;
