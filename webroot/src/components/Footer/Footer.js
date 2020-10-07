import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import moment from "moment";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left footer-logo">
              <NavLink to="/">
                <img src="/logo.svg" width="86px" />
              </NavLink>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-9 col-xs-9 text-center footer-details">
              ©{moment().format("YYYY")} OTC

              <span className="divisor">|</span>

              <NavLink to="#">
                Terms of Service
              </NavLink>

              <span className="divisor">|</span>

              <NavLink to="#">
                Privacy Policy
              </NavLink>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-right social-media-links">
              <ul className="list-unstyled list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#">
                    <img src="/telegram.svg" width="24px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img src="/twitter.svg" width="24px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <img src="/email.svg" width="24px" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
