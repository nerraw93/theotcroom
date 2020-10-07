import React, { Component } from "react";
import SearchOrders from './SearchOrders';
import UserLogs from './UserLogs';
import CreateOrder from './CreateOrder';
import RecentMessages from './RecentMessages';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
          orders: null,
        }

    }

    componentWillMount() {
      const { myOrders } = this.props;

      myOrders();
    }

    componentWillReceiveProps(nextProps) {
      const { orders } = nextProps;

      this.setState({
        orders: orders.orders,
      });
    }

    _clearAllUsers = () => {
        this.setState({ all_users: null });
    };

    render() {
        const { orders } = this.state;
        const { addNote } = this.props;

        return (
            <div id="dashboard" className="user-dashboard-container dashboard-container">
                <SearchOrders />
                <div className="row">
                  <div className="col-md-8 col-sm-12">
                    <UserLogs orders={orders} addNote={addNote}/>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="row">
                      <div className="col-12">
                        <CreateOrder />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <RecentMessages />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
