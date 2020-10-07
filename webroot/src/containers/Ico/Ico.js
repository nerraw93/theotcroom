import Ico from "../../components/Ico";
import { connect } from "react-redux";
import { createIco } from "../../actions/ads";

const mapActionCreators = {
  createIco
};

const mapStateToProps = state => ({
  icos: state.ads
});

export default connect(mapStateToProps, mapActionCreators)(Ico);
