import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import LoggedInMenu from "./LoggedInMenu";
import Notification from "./Notification";
import cx from "classnames";
import LoginModal from "../Home/LoginModal";
import RegisterModal from "../Home/RegisterModal";
import ConfirmModal from "../Home/ConfirmModal";
import ForgotPasswordModal from "../Home/ForgotPasswordModal";

class Header extends Component {
    componentDidMount() {
        const { me, getNotifications } = this.props;
        const auth = JSON.parse(localStorage.getItem("persist:root"));
        const token = auth && JSON.parse(auth.auth);

        if (token && token.token) {
            me()
            getNotifications()
        }
    }

    componentWillReceiveProps(nextProps) {
        const { me, auth } = nextProps;
        const loginSuccessful = !auth.loggingIn && auth.loginSuccess && !auth.loginError;
        const registerSuccessful = !auth.registering && auth.registerSuccess && !auth.registerError;

        if (auth.token && auth.token.token) {
            me()
        }

        if (loginSuccessful) {
            const { loginModal } = this.refs;
            loginModal.close();
            window.location.reload()
        }

        if (registerSuccessful) {
            const { registerModal } = this.refs;
            registerModal.close();
            this._openConfirmModal();
        }
    }

    _openLoginModal = () => {
        const { loginModal } = this.refs;
        loginModal.setClass("login-modal");
        loginModal.open();
    };

    _openRegisterModal = () => {
        const { registerModal } = this.refs;
        registerModal.setClass("register-modal");
        registerModal.open();
    };

    _openConfirmModal = () => {
        const { confirmModal } = this.refs;
        confirmModal.setClass("confirm-modal");
        confirmModal.open();
    };

    _openForgotPasswordModal = () => {
        const { forgotPasswordModal } = this.refs;

        forgotPasswordModal.setClass("forgot-password-modal");
        forgotPasswordModal.open();
    };

    render() {
        const { auth, path, myself, register, login, logout, showFlashMessage, notifications } = this.props;

        return (
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        <img src="/logo.svg" width="98px" alt=""/>
                    </NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <span>The OTC Room is a safe and free peer to peer crypto marketplace.</span>
                            </li>
                        </ul>
                        <Notification auth={auth} notifications={notifications} />
                        {
                            myself
                            ? <LoggedInMenu myself={myself} logout={logout} />
                            : <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink to="/" className={cx("nav-link", path === "/" && "active")}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="#" className={cx("nav-link", path === "/advertisements" && "active")}>About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="#" className="nav-link" onClick={this._openLoginModal}>Login</NavLink>
                                </li>
                            </ul>
                        }
                        { !myself && <NavLink to="" className="nav-link btn btn-blue text-center d-none d-md-block" onClick={this._openRegisterModal}>REGISTER</NavLink> }


                    </div>
                    <button className="navbar-toggler d-md-none d-sm-block d-xs-block" type="button"
                        data-toggle="collapse" data-target="#navbarToggleHeader"
                        aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggleHeader">
                            {
                                myself
                                ? <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                    <NavLink to="/me/dashboard" className="nav-link p-2">
                                        Dashboard
                                    </NavLink>
                                    </li>
                                    <li className="nav-item">
                                      <NavLink to="/me/edit" className="nav-link p-2">
                                        Edit Profile
                                      </NavLink>
                                    </li>
                                <li className="nav-item">
                                  <NavLink to="/me/settings" className="nav-link p-2">
                                    Settings
                                  </NavLink>
                                </li>
                                <li className="nav-item">
                                  <NavLink to="#" onClick={logout} className="nav-link p-2">
                                    Logout
                                  </NavLink>
                                </li>
                            </ul>
                                : <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                    <NavLink to="/" className={cx("nav-link", path === "/" && "active")}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="#" className={cx("nav-link", path === "/advertisements" && "active")}>About Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="#" className="nav-link" onClick={this._openLoginModal}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="" className="nav-link btn btn-blue text-center d-none d-md-block" onClick={this._openRegisterModal}>REGISTER</NavLink>
                                </li>
                            </ul>
                            }
                    </div>

                </div>
                <LoginModal ref="loginModal" login={login} auth={auth} openRegisterModal={this._openRegisterModal} openForgotPasswordModal={this._openForgotPasswordModal}/>
                <RegisterModal ref="registerModal" register={register} auth={auth} openConfirmModal={this._openConfirmModal}/>
                <ConfirmModal ref="confirmModal"/>
                <ForgotPasswordModal showFlashMessage={showFlashMessage} ref="forgotPasswordModal"/>
            </nav>

        )
    }
}

export default Header;
