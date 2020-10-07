/**
 * Admin Dashboard
 */
import Dashboard from "../../components/Dashboard/Admin/Dashboard";
import { connect } from "react-redux";
import { myOrders } from "../../actions/ads";
import { countDeals, countUsers, getWeeklyUsers, getWeeklyUsersByDate } from "../../actions/reservations";
import { getRecentUsers, searchRecentUsers } from "../../actions/users";

const mapActionCreators = {
  myOrders,
  countDeals,
  countUsers,
  getWeeklyUsers,
  getWeeklyUsersByDate,
  getRecentUsers,
  searchRecentUsers
};

const mapStateToProps = state => ({
  myself: state.auth.myself,
  orders: state.ads.orders,
  deals: state.reservations.deals,
  users: state.reservations.users,
  total_users: state.reservations.total_users,
  recent_users: state.users.recent_users,
});

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
