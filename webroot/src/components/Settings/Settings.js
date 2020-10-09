import React, {Component} from "react";
import BankAccountForm from "./BankAccountForm";
import ResetPasswordForm from "./ResetPasswordForm";
import Tabs from "../common/Tabs";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_form: "bank"
    };
  }

  _handleClickFormChange = (selected_form) => {
    this.setState({ selected_form });
  };

  onSubmitBankAccount = (data) => {
    const { createBankAccount } = this.props;
    createBankAccount(data);
  };

  onSubmitChangePassword = (data) => {
    const { changePassword } = this.props;
    changePassword(data);
  };

  render() {
    const { selected_form } = this.state;
    const { bankAccount, password  } = this.props;
    const tabs = [
      { display_name: "Bank Account", name: "bank" },
      { display_name: "Crypto Wallet", name: "wallet" },
    ];

    return (
      <div className="content-container settings-container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="title">Settings</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="header-with-icon">
              <img src="/bank-account.svg" alt=""/>
              <span className="title">Wallet/Bank</span>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Tabs
              title="Create your Wallet/Bank"
              subtitle="Create your wallet or link your bank to your profile to start trading"
              tabs={tabs}
              selected={selected_form}
              onClick={this._handleClickFormChange}
            />
            <div className="inner-block-body">
              {
                selected_form === "bank"
                  ? <BankAccountForm onSubmit={this.onSubmitBankAccount} prop={bankAccount}/>
                  : "Nada"
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="header-with-icon">
              <img src="/login-lock.svg" alt=""/>
              <span className="title">Password</span>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tabs-wrapper">
              <h4>Change Password</h4>
              <p>To change your password you must enter your current password below</p>
            </div>
            <div className="inner-block-body">
              <ResetPasswordForm onSubmit={this.onSubmitChangePassword} prop={password}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
