import React, { Component } from "react";
import { deleteFlashMessage } from "../../actions/app";

class FlashMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hide: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { flashMessage: { message } } = nextProps;
        message && this.hideMessage();
    }

    displayMessage = (message) => {
        if (message instanceof Array) {
            let messages = "";

            message.forEach(m => {
                messages += `${m}\n`;
            });

            return messages;
        }

        return message;
    };

    hideMessage = () => {
        this.setState({ hide: false });

        setTimeout(() => {
            this.setState({ hide: true });
            deleteFlashMessage();
        }, 4000);
    };

    render() {
        const { hide } = this.state;
        let { flashMessage: { message, type } } = this.props;
        if (type == 'error')
        type = 'danger'
        if (type == '' || type == undefined)
        type = 'info'
        const alertClass = `text-left alert alert-${type}`;

        return (
            !hide && <div className={alertClass}>
            <span style={{ whiteSpace: "pre-line" }}>
                {this.displayMessage(message)}
            </span>
        </div>
    )
}
}

export default FlashMessage;
