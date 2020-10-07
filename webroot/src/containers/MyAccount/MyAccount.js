import MyAccount from "../../components/MyAccount";
import { connect } from "react-redux";

const mapActionCreators = {
};

const mapStateToProps = state => ({
  myself: state.auth.myself,
});

export default connect(mapStateToProps, mapActionCreators)(MyAccount);