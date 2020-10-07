import React, { Component } from "react";
import Statistics from "./Statistics";
import Chart from "./Chart";
import Orders from "./Orders";
import Members from "./Members";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id="dashboard" className="col-12 dashboard-container">
                <Statistics size="col-lg-2 col-sm-6 col-xs-12" />
                <Chart  />
                <Members />
                <Orders />
            </div>
        )
    }
}
