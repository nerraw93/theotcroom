import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CreateOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        return (
            <div className="create-order-container">
                <div className="box">
                    <div className="header-title">Create Order</div>
                    <div className="header-title-description">Create order to start trading.</div>
                    <div className="text-center button-container">
                        <NavLink to="/order/new"
                            className="btn btn-blue w-50">
                            CREATE ORDER
                        </NavLink>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateOrder;
