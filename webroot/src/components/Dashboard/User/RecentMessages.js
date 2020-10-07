import React, { Component } from "react";

class RecentMessages extends Component {
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
      <div className="recent-messages-container">
        <div className="box">
          <div className="header-title">Recent Messages</div>
          <div className="box-header-border-bottom"></div>
          <div className="text-center messages-container">
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
              </div>
            </div>
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
              </div>
            </div>
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
              </div>
            </div>
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt u
                </div>
              </div>
            </div>
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labo
                </div>
              </div>
            </div>
            <div className="row message">
              <div className="col-3">
                <img src="/no-user-image.jpg" className="rounded-circle" />
              </div>
              <div className="col-9 details">
                <div className="message-header text-left">User Name <span>3 min ago</span></div>
                <div className="message text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm
                </div>
              </div>
            </div>
          </div>
          <div className="box-header-border-bottom-footer"></div>
          <div className="box-footer">
            <a href="#">VIEW ALL CONVERSATION</a>
          </div>
        </div>
      </div>
    )
  }
}

export default RecentMessages;
