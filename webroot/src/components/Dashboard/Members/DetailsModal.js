import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";
import Loading2 from "../../common/Loading2";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

export default class DetailsModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            isLoading: true
        };
        this._fetchUserDetails = this._fetchUserDetails.bind(this)
        this._close = this._close.bind(this)
        this._renderUserDetails = this._renderUserDetails.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId && this.props.userId != null) {
            this._fetchUserDetails(this.props.userId);
        }
    }

    _fetchUserDetails(id) {
        this.setState({ isLoading: true });
        window.http.get(`admin/user/${id}/details`)
            .then(({ data: { user } }) => {
                this.setState({ user, isLoading: false });
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    _close() {
        this.setState({ user: null, isLoading: false});
        this.props.close();
    }

    _renderUserDetails() {
        const { isLoading, user } = this.state;
        if (isLoading)
            return <Loading2 />

        if (!user)
            return false;

        const { user: {
            full_name,
            email,
            country,
            last_seen,
            is_banned,
            profile_picture,
            bio,
            telegram_username,
            website,
            youtube_video,
            facebook_profile,
            linkedin_profile,
            twitter_profile,
        } } = this.state;

        return (
            <div className="row">
                <div className="col-12"><h4>Personal Information</h4></div>
                <div className="col-8 mt-2">
                    <h5>Name:  <span className="text-capitalize">{full_name}</span></h5>
                    <h5>Email:  <span>{email}</span></h5>
                    <h5>Country:  <span>{country}</span></h5>
                    <h5>Last Seen:  <span>{moment(last_seen).format("MMMM D, YYYY h:mm:ss a")}</span></h5>
                    <h5>Status:  <strong>{is_banned ? 'Banned' : 'Active'}</strong></h5>
                </div>
                <div className="col-4 mt-2">
                    <div className="profile-image shadow-none p-3 bg-light">
                        <img src={profile_picture || "/no-user-image.jpg"} width="100" className="rounded mx-auto d-block img-rounded" alt="username" />
                    </div>
                </div>
                <div className="col-12 mt-3"><h4>Ratings</h4></div>
                <div className="col-4">
                    <div className="text-center">
                        <span className="fa-layers fa-7x fa-fw">
                            <FontAwesomeIcon icon="star"  color="#f29543" />
                            <span className="fa-layers-text text-size-4 font-weight-bold fa-inverse">27</span>
                        </span>
                        <br />
                        Trust
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <span className="fa-layers fa-7x fa-fw">
                            <FontAwesomeIcon icon="heart-broken" color="#e62e00" />
                            <span className="fa-layers-text text-size-4 font-weight-bold fa-inverse text-dark">3</span>
                        </span>
                        <br />
                        Distrust
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-center">
                        <span className="fa-layers fa-7x fa-fw">
                            <FontAwesomeIcon icon="handshake" className="text-primary" />
                            <span className="fa-layers-text text-size-4 font-weight-bold fa-inverse text-warning" style={{fontColor: '#ff3300'}}>27</span>
                        </span>
                        <br />
                        Deals Completed
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <h4>Bio:</h4>
                    <div className="shadow-none p-3 mb-2 bg-light rounded">{bio}</div>
                </div>
                <div className="col-12">
                    <h4>External Links:</h4>
                    <h5>
                        <FontAwesomeIcon className="mr-1" icon={['fab', 'chrome']} />
                        Website:
                        <a className="ml-2" href={website} target="_blank">{website}</a>
                    </h5>
                    <h5>
                        <FontAwesomeIcon className="mr-1" icon={['fab', 'facebook']} />
                        Facebook:
                        <a className="ml-2" href={facebook_profile} target="_blank">{facebook_profile}</a>
                    </h5>
                    <h5>
                        <FontAwesomeIcon className="mr-1" icon={['fab', 'twitter']} />
                        Twitter:
                        <a className="ml-2" href={twitter_profile} target="_blank">{twitter_profile}</a>
                    </h5>
                    <h5>
                        <FontAwesomeIcon className="mr-1" icon={['fab', 'linkedin']} />
                        LinkedIn:
                        <a className="ml-2" href={linkedin_profile} target="_blank">{linkedin_profile}</a>
                    </h5>
                    <h5>
                        <FontAwesomeIcon className="mr-1" icon={['fab', 'telegram']} />
                        Telegram username:
                        <i className="ml-2">{telegram_username}</i>
                    </h5>
                </div>
            </div>
        );
    }

    render() {
        const { isShow, close } = this.props;
        let { user } = this.state;

        return (
            <Modal className="modal confirm" visible={isShow}>
                <div className="modal-header">
                    <div className="modal-title mt-0 text-white">
                        <h4 className="text-white">User Details</h4>
                    </div>
                </div>
                <div className="modal-body">
                    {this._renderUserDetails()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary"
                        onClick={this._close}>
                        CLOSE
                    </button>
                </div>
            </Modal>
        )
    }
}

DetailsModal.propTypes = {
    userId: PropTypes.number,
    close: PropTypes.func.isRequired,
    isShow: PropTypes.bool.isRequired,
};
