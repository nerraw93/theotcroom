import React, { Component } from "react";

class SearchOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        return (
          <div className="search-order-container">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <h1 className="mb-5">Search Orders</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label><strong>I am</strong></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label><strong>Cryptocurrency</strong></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label><strong>Payment Method</strong></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-2">
                <button type="button" className="btn btn-primary btn-search">SEARCH</button>
              </div>
            </div>
          </div>
        )
    }
}

export default SearchOrders;
