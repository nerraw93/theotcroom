import React from "react";
import BaseModal from '../common/BaseModal';
// import Input from '../common/Input';

class ConfirmModal extends BaseModal {
  renderBody = () => {
    // const { first_name, last_name, email, password } = this.state;
    return (
      <div className="confirm-modal text-center">
        <img src="/register_confirm.svg" alt=""/>
        <h3>Thanks for Signing Up!</h3>
        <p>
          Please check your email and hit the verification button in the message that we just sent to you.
        </p>
      </div>
    )
  }
}

export default ConfirmModal;
