import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";
import cx from "classnames";

class BaseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      className: ""
    }
  }

  open = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  setClass = (className) => {
    this.setState({ className })
  };

  renderHeader = () => {
  };

  renderBody = () => {
  };

  renderFooter = () => {
  };

  render() {
    const { show, className } = this.state;
    
    return (
      <Modal className={cx("modal", className)} visible={show}>
        <div className="modal-header col-lg-12 p-0">
          <div className="modal-title col-lg-12 p-0">
            {this.renderHeader()}
          </div>
        </div>
        <div className="modal-body col-lg-12 p-0">
          {this.renderBody()}
        </div>
        <div className="modal-footer col-lg-12 p-0">
          {this.renderFooter()}
        </div>
      </Modal>
    )
  }
}

export default BaseModal;
