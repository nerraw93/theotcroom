import Home from "../../components/Home";
import { connect } from "react-redux";
import { fetchAds } from "../../actions/ads";
import { countReservations } from "../../actions/reservations";

const mapActionCreators = {
  fetchAds,
  countReservations
};

const mapStateToProps = state => ({
  ads: state.ads,
  auth: state.auth.myself,
  reservations: state.reservations.reservations.total
});

export default connect(mapStateToProps, mapActionCreators)(Home);