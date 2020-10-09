import React, { Component } from "react";
import FlashMessage from "../containers/FlashMessage";
import Header from "../containers/Home/Header";
import Home from "../containers/Home";
import ResetPassword from "../containers/Auth/ResetPassword";
import MyAccount from '../containers/MyAccount';
import Settings from '../containers/Settings';
import EditProfile from '../containers/MyAccount/EditProfile';
import Ico from "../containers/Ico";
import Order from "../containers/Order";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { connect } from "react-redux";
import Footer from '../components/Footer/Footer';
import BrowseOrders from "../containers/Order/Browse";

import AdminDashboard from "../containers/Dashboard";
import UserDashboard from "../containers/Dashboard/UserDashboard";

const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: "/",
    authenticatedSelector: state => state.auth.token !== null,
    wrapperDisplayName: "UserIsNotAuthenticated"
});

const DefaultLayout = ({ children, ...rest }) => {
    const path = children.props.location.pathname;
    let addIdMain = true;
    let fullWIdth = false;

    if (path === '/me/settings') {
        addIdMain = false;
    }

    if (path === '/me/dashboard') {
        fullWIdth = true;
    }

    return (
        <div>
            <Header path={path} />
            <div id={addIdMain ? 'main' : ''} className={fullWIdth ? 'container-fluid' : 'container'}>
                <div id="alert-container"></div>
                <FlashMessage/>
                {children}
            </div>
            <Footer/>
        </div>
    )
};

const DefaultRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
                <DefaultLayout>
                    <Component {...matchProps} {...rest} />
                </DefaultLayout>
            )} />
    )
};

class AppContainer extends Component {

    render() {
        let Dashboard = AdminDashboard;

        if (this.props.myself) {
            let {is_admin} = this.props.myself;
            Dashboard = is_admin === "1" ? AdminDashboard : UserDashboard;
        }


        return (
            <BrowserRouter>
                <Switch>
                    <DefaultRoute exact path="/" component={Home}/>
                    <DefaultRoute exact path="/reset-password/:token" component={ResetPassword}/>
                    <DefaultRoute exact path="/me" component={userIsNotAuthenticated(MyAccount)}/>

                    <DefaultRoute exact path="/me/dashboard" component={userIsNotAuthenticated(Dashboard)}/>
                    <DefaultRoute exact path="/me/edit" component={userIsNotAuthenticated(EditProfile)}/>
                    <DefaultRoute exact path="/me/settings" component={userIsNotAuthenticated(Settings)}/>
                    <DefaultRoute exact path="/me/order" component={userIsNotAuthenticated(BrowseOrders)}/>
                    <DefaultRoute exact path="/order/new" component={userIsNotAuthenticated(Ico)}/>

                    {/**
                     * Public routes 
                    */}
                    <DefaultRoute exact path="/order/:id" component={Order}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    myself: state.auth.myself,
});

export default connect(mapStateToProps)(AppContainer);
