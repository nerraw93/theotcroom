import FlashMessage from "../components/common/FlashMessage";
import { connect } from "react-redux";

const mapActionCreators = {};

const mapStateToProps = state => ({
  flashMessage: state.app.flashMessage
});

export default connect(mapStateToProps, mapActionCreators)(FlashMessage);