import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";
import cx from "classnames";
import Loading2 from "../../common/Loading2";

class ViewNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            className: "",
            order: {},
        }
    }

    open = (order) => {
        this.setState({ show: true });
        this.setState({ order: order });
    };

    close = () => {
        this.setState({ show: false });
    };

    renderHeader = () => {
        return (
            <h4 className="modal-title">View note</h4>
        )
    };

    _toggleAction = () => {
        const { toggleIcoHideShow } = this.props;
        const { order } = this.state;
        toggleIcoHideShow(order.id);
        this.close();
    }

    close = () => {
        this.setState({ show: false });
    }

    renderBody = () => {
        const {order} = this.state;
        return (
            <div className="confirm-modal text-center">
                <p>{order.notes}</p>
            </div>
        )
    };

    renderFooter = () => {
        const {order} = this.state;

        return (
            <div className="chat col-12 text-right buttons p-0">
                <div className="w-100 mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={this.close}
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        )
    }

        render() {
            const { show, className } = this.state;
            return (
                <Modal className="modal" visible={show}>
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
export default ViewNotes;
