import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class LoggedInMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myself: {
                first_name: "",
                last_name: "",
                profile_picture: "",
            },
            isLoading: true
        }
    }

    componentWillMount() {
        const root = JSON.parse(localStorage.getItem("persist:root"));
        const auth = root && JSON.parse(root.auth);

        if (auth.myself) {
            this.setState({
                myself: auth.myself
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { myself } = nextProps;

        if (myself) {
            this.setState({ myself });
        }
    }

    render() {
        const { logout, myself } = this.props;
        const name = `${myself.first_name} ${myself.last_name}`;

        return (
            <div className="d-none d-md-block d-lg-block d-xl-block">
                <div className="logged-in dropdown media">
                    <img className="align-self-start mr-3"
                        src={myself.profile_picture || "/no-user-image.jpg"}
                        alt={name}/>
                    <h5 className="dropdown-toggle" data-toggle="dropdown">{name}</h5>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li className="nav-item">
                            <NavLink to="/me/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/me/edit">
                                Edit Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/me/settings">
                                Settings
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="#" onClick={logout}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

LoggedInMenu.propTypes = {
    myself: PropTypes.object.isRequired
};

export default LoggedInMenu;
