import EditProfile from "../../components/MyAccount/EditProfile";
import { connect } from "react-redux";
import { update, uploadPhoto } from "../../actions/users";
import { me } from "../../actions/auth";


const mapActionCreators = {
  update,
  uploadPhoto,
  me
};

const mapStateToProps = state => ({
  photo: state.users.photo,
  users: state.users,
  myself: state.auth.myself,
});

export default connect(mapStateToProps, mapActionCreators)(EditProfile);
