import React, { Component } from "react";
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

export default class Notifier
{
    success(message) {
        this.show(message, 'success');
    }

    error(message) {
        this.show(message, 'danger');
    }

    show(message, type) {
        const container = document.getElementById('alert-container');
        const alert = React.createElement('div',{
            className: `alert alert-${type}`,
            style: {whiteSpace: 'pre-line'}
        }, message);
        ReactDOM.render(alert, container);

        setTimeout(() => {
            unmountComponentAtNode(container);
        }, 4000);
    }
}
