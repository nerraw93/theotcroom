import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default class Info extends Component {
    render() {
        const { seller } = this.props;

        return (
            <div className="seller-info text-center col-lg-4">
                <div className="session-block">
                <h3 className="text-left">Seller Info</h3>

                <div className="profile-picture m-auto">
                    <img
                        src={seller.profile_picture || "/no-user-image.jpg"}
                        alt={`${seller.first_name} ${seller.last_name}`}
                        title={`${seller.first_name} ${seller.last_name}`}
                        className="w-100"
                        />
                </div>

                <h3 className="user-name">{`${seller.first_name} ${seller.last_name}`}</h3>
                <p className="text-muted">Member since {moment(seller.created_at).format("MMMM D, YYYY")}</p>

            <div className="social col-lg-12 p-0">
            <div className="row">
            {
                seller.facebook_profile && <div className="col-lg-3 col-md-6 col-sm-12">
                <a href={seller.facebook_profile} target="_blank">
                <img src="/facebook.svg" />
                </a>
                </div>
            }
            {
                seller.telegram_username && <div className="col-lg-3 col-md-6 col-sm-12">
                <a href={seller.telegram_username} target="_blank">
                <img src="/telegram.svg" />
                </a>
                </div>
            }
            {
                seller.twitter_profile && <div className="col-lg-3 col-md-6 col-sm-12">
                <a href={seller.twitter_profile} target="_blank">
                <img src="/twitter.svg" />
                </a>
                </div>
            }
            {
                seller.email && <div className="col-lg-3 col-md-6 col-sm-12">
                <a href={`mailto:${seller.email}`}>
                <img src="/email.svg" />
                </a>
                </div>
            }
            </div>
            </div>

            <div className="statistics col-lg-12 p-0">
            <div className="row">
            <div className="col-lg-3 text-center">
            <p className="number">0</p>
            </div>
            <div className="col-lg-9 text-left">
            <p className="legend">Trust Level</p>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-3 text-center">
            <p className="number">0</p>
            </div>
            <div className="col-lg-9 text-left">
            <p className="legend">Deals Completed</p>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-3 text-center">
            <p className="number">0</p>
            </div>
            <div className="col-lg-9 text-left">
            <p className="legend">Buy Orders</p>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-3 text-center">
            <p className="number">0</p>
            </div>
            <div className="col-lg-9 text-left">
            <p className="legend">Sell Orders</p>
            </div>
            </div>
            </div>
            </div>
            </div>

        )
    }
}

Info.propTypes = {
    seller: PropTypes.object.isRequired
};

Info.defaultProps = {};
