import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap4-modal";

export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        let { isShow, title, message, cancel, confirm, type } = this.props;
        if (!title)
            title = 'Confirm';

        return (
            <Modal className="modal confirm" visible={isShow}>
                <div className={`modal-header bg-${type}`}>
                    <h3 className="modal-title mt-0 text-white mb-0">
                        {title}
                    </h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={cancel} className="btn btn-default text-dark">
                        Cancel
                    </button>
                    <button type="button" onClick={confirm} className={`btn btn-${type} ${type}`}>
                        Confirm
                    </button>
                </div>
            </Modal>
        )
    }
}

ConfirmDialog.propTypes = {
    title: PropTypes.string,
    isShow: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
    type: 'primary'
};
