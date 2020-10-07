import ResetPassword from "../../components/Auth/ResetPassword";
import { connect } from "react-redux";
import { showFlashMessage } from "../../actions/app";

const mapActionCreators = {
    showFlashMessage
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapActionCreators)(ResetPassword);
