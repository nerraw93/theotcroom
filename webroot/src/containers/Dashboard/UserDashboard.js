/**
 * User Dashboard
 */
import Dashboard from "../../components/Dashboard/User/Dashboard";
import { connect } from "react-redux";
import { myOrders, addNote } from "../../actions/ads";
import { countDeals } from "../../actions/reservations";

const mapActionCreators = {
  myOrders,
  addNote,
};

const mapStateToProps = state => ({
  myself: state.auth.myself,
  orders: state.ads.orders,
});

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
