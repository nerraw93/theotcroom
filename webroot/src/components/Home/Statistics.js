import React, { Component } from 'react';
import PropTypes from "prop-types";

class Statistics extends Component {
  render() {
    const { buy, sell, ongoing, completed } = this.props;

    return (
      <div className="statistics col-12 p-0">
        <h1 className="mb-3">Order Counter</h1>
        <div className="row">
          <div className="col-12 text-center">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="session-block">
                  <div className="media">
                    <div className="img text-center home-buy-orders">
                      <img src="./home-buy-orders.svg" alt=""/>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">{buy}</h5>
                      <span>Buy Orders</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="session-block">
                  <div className="media">
                    <div className="img text-center home-sell-orders">
                      <img src="./home-sell-orders.svg" alt=""/>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">{sell}</h5>
                      <span>Sell Orders</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="session-block">
                  <div className="media">
                    <div className="img text-center home-ongoing-deals">
                      <img src="./home-ongoing-deals.svg" alt=""/>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">{ongoing}</h5>
                      <span>OnGoing Deals</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="session-block">
                  <div className="media">
                    <div className="img text-center home-completed-deals">
                      <img src="./home-completed-deals.svg" alt=""/>
                    </div>
                    <div className="media-body">
                      <h5 className="mt-0">{completed}</h5>
                      <span>Deals Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Statistics.propTypes = {
  buy: PropTypes.number.isRequired,
  sell: PropTypes.number.isRequired,
};

export default Statistics;
