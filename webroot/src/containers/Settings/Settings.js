import Settings from "../../components/Settings";
import { connect } from "react-redux";
import { createBankAccount } from "../../actions/bankAccount";
import { changePassword } from "../../actions/users";

const mapActionCreators = {
  createBankAccount,
  changePassword
};

const mapStateToProps = state => ({
  myself: state.auth.myself,
  bankAccount: state.bankAccount.bank,
  password: state.users.password
});

export default connect(mapStateToProps, mapActionCreators)(Settings);