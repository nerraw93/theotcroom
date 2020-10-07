import Page from "../../components/Order/Page";
import { connect } from "react-redux";
import { fetchComments, fetchIcoDetails, writeComments } from "../../actions/ads";
import { fetchReservations, reserve } from "../../actions/reservations";
import { me } from "../../actions/auth";

const mapActionCreators = {
    fetchIcoDetails,
    reserve,
    fetchComments,
    writeComments,
    fetchReservations,
    me
};

const mapStateToProps = state => ({
    myself: state.auth.myself,
    icoDetails: state.ads.icoDetails,
    reservations: state.reservations.reservations,
    comments: state.ads.comments,
    comment: state.ads.comment,
    auth: state.auth,
});

export default connect(mapStateToProps, mapActionCreators)(Page);
