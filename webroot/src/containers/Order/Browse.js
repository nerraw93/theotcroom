import BrowseOrders from "../../components/Order/Browse";
import { connect } from "react-redux";
import { myOrders, toggleIcoHideShow } from "../../actions/ads";

const mapActionCreators = {
  myOrders,
  toggleIcoHideShow,
};

const mapStateToProps = state => ({
  myself: state.auth.myself,
  orders: state.ads.orders,
});

export default connect(mapStateToProps, mapActionCreators)(BrowseOrders);
