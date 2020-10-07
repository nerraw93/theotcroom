import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import { me, register, login, logout } from "../../actions/auth";
import { showFlashMessage } from "../../actions/app";
import { getNotifications } from "../../actions/notification";

const mapActionCreators = {
    me,
    showFlashMessage,
    register,
    login,
    logout,
    getNotifications
};

const mapStateToProps = state => ({
    myself: state.auth.myself,
    auth: state.auth,
    flashMessage: state.app.flashMessage,
    notifications: state.notification,
});

export default connect(mapStateToProps, mapActionCreators)(Header);
