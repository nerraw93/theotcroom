import React, { Component } from "react";
import Loading2 from "../../common/Loading2";
import Tabs from "../../common/Tabs";
import ViewNotes from "../Modals/ViewNotes";
import AddNote from "../Modals/AddNote";
import moment from "moment";
import _ from "lodash";

class UserLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_activities: [],
      past_orders: [],
      data: [],
      tab: "order_activities",
    }

  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps;

    if (orders) {
      this.setState({
        data: orders,
        order_activities: orders,
        past_orders: _.filter(orders, { status: "completed" }),
      })
    }
  }

  renderOrderActivities = (data) => {
    return data.map(order => {
      const date_create = moment(order.created_at, "YYYY/MM/DD").format("MMMM");
      const month = date_create.substring(0, 3);
      const day = moment(order.created_at, "YYYY/MM/DD").format("D");

      return (<li key={order.id} className="list-group-item data">
        <div className="row">
          <div className="col-2 date text-left">{month} <br /><span>{day}</span></div>
          <div className="col-4 message">
            {this.getOrderDescription(order.type, order.currency)} <br /><a href="#">{order.name}</a>
          </div>
          <div className="col-4 details text-right">
              + {order.currency} {order.selling_price_token}
          </div>
          <div className="col-2 logged-in dropdown media">
            <button className="btn btn-blue dropdown-toggle" type="button" data-toggle="dropdown">Actions <span className="caret"></span></button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {order.status !== 'completed' &&
                <button className="dropdown-item" onClick={() => this._showToggleAddNoteModal(order)}>Add Note</button>
              }
              <button className="dropdown-item" onClick={() => this._showToggleViewNotesModal(order)}>View Notes</button>
            </div>
          </div>
        </div>
        </li>
      );
    })
  };

  handleTabChanges = (tab) => {
    this.setState({
      tab,
      data: this.state[tab]
    });
  };

  getOrderDescription = (type, currency) => {
    if (type === "buy") {
      return "Received " + currency + " from";
    }
    else if (type === "sell") {
      return "Bought " + currency + " from";
    }
  };

  _showToggleViewNotesModal = (order) => {
      const { ViewNotes } = this.refs;

      ViewNotes.open(order);
  }

  _showToggleAddNoteModal = (order) => {
    const { AddNote } = this.refs;

    AddNote.open(order);
  }


  render() {
    const { data, tab } = this.state;
    const tabs = [
      { display_name: "Order Activities", name: "order_activities" },
      { display_name: "Past Orders", name: "past_orders" },
    ];
    const { addNote } = this.props;

    return (
      <div className="user-logs-container">
        <div className="box">
          <div className="row">
            <div className="col">
            <Tabs
                tabs={tabs}
                selected={tab}
                onClick={this.handleTabChanges}
              />
            </div>
          </div>
          <div className="box-list-data">
            <ul className="list-group">
              {this.renderOrderActivities(data)}
            </ul>
          </div>
        </div>
        <ViewNotes ref="ViewNotes"/>
        <AddNote ref="AddNote" addNote={addNote}/>
      </div>
    )
  }
}

export default UserLogs;
