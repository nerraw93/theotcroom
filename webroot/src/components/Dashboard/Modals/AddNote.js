import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";
import cx from "classnames";
import Loading2 from "../../common/Loading2";
import Textarea from "../../common/Textarea";
import PropTypes from "prop-types";

class AddNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            className: "",
            order: {},
            note: "",
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
            <h4 className="modal-title">Add note</h4>
        )
    };

    _toggleAction = () => {
        const { addNote } = this.props;
        const { order, note } = this.state;
        addNote({note: note, id: order.id});
        this.close();
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    };

    renderBody = () => {
        const {order, note} = this.state;
        return (
            <Textarea name="note"
            value={note} onChange={this.onChange}
            placeholder="Write down any pertinent information about this allocation to ensure a smooth transaction"/>
        )
    };

    renderFooter = () => {
        const {order} = this.state;

        return (
            <div className="modal-footer pr-0">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.close}
                >
                    CANCEL
                </button>
                <button
                    type="button"
                    className="btn btn-blue"
                    onClick={this._toggleAction}
                >
                    SUBMIT
                </button>
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
                    {this.renderFooter()}
            </Modal>
        )
    }
}

AddNotes.propTypes = {
    note: PropTypes.string,
};

export default AddNotes;
