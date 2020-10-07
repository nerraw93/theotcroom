import React, { Component } from "react";
import PropTypes from "prop-types";
import ConfirmDialog from "../../common/ConfirmDialog";

export default class Manager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowConfirmDialog: false,

        }

        this._hideArchiveRestoreModal = this._hideArchiveRestoreModal.bind(this)
        this._confirmArchiveOrder = this._confirmArchiveOrder.bind(this)
        this._confirmRestoreOrder = this._confirmRestoreOrder.bind(this)

        // <button className="btn mb-3 w-100 btn-block btn-royal-blue">SHARE</button>
        // <button className="btn mb-3 w-100 btn-block btn-orange">EDIT</button>
    }

    _hideArchiveRestoreModal() {
        this.setState({ isShowConfirmDialog: false })
    }

    _confirmArchiveOrder() {
        const { ico } = this.props
        window.http.post(`order/${ico.uuid}/archive`)
            .then(({ data: {message} }) => {
                window.alert.success(message);
                this.setState({ isShowConfirmDialog: false })
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            }).catch(({ data }) => {
                window.alert.error(data.error);
                this.setState({ isShowConfirmDialog: false })
            });
    }

    _confirmRestoreOrder() {
        const { ico } = this.props
        window.http.post(`order/${ico.uuid}/restore`)
            .then(({ data: {message} }) => {
                window.alert.success(message);
                this.setState({ isShowConfirmDialog: false })
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000)
            }).catch(({ data }) => {
                window.alert.error(data.error);
                this.setState({ isShowConfirmDialog: false })
            });
    }

    _renderRestoreButton() {
        const { isShowConfirmDialog } = this.state

        return (
            <span>
                <ConfirmDialog cancel={this._hideArchiveRestoreModal} confirm={this._confirmRestoreOrder}
                    isShow={isShowConfirmDialog} message={'Are you sure you want to restore this order?'} />
                <button className="btn mb-3 w-100 btn-block btn-info"
                    onClick={() => this.setState({ isShowConfirmDialog: true })}>
                    RESTORE
                </button>
            </span>
        );
    }

    _renderArchiveButton() {
        const { isShowConfirmDialog } = this.state

        return (
            <span>
                <ConfirmDialog cancel={this._hideArchiveRestoreModal} confirm={this._confirmArchiveOrder}
                    isShow={isShowConfirmDialog} type="warning" message={'Are you sure you want to archive this order?'} />
                <button className="btn mb-3 w-100 btn-block btn-warning"
                    onClick={() => this.setState({ isShowConfirmDialog: true })}>
                    ARCHIVE
                </button>
            </span>
        );
    }

    render() {

        const { orderIsDisabled } = this.props

        return (
            <div className="seller-info text-center col-lg-4">

                <div className="session-block">
                    <div className="row">
                        <div className="col-lg-12">

                        </div>
                        <div className="col-lg-12">

                        </div>
                        <div className="col-lg-12">
                            {orderIsDisabled ? this._renderRestoreButton() : this._renderArchiveButton()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
