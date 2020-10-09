import React, { Component } from "react";
import Loading from '../common/Loading';
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myself: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { myself } = nextProps;

    if (myself) {
      this.setState({ myself });
    }
  }

  _renderSocialMedia = (link, linkedin = false) => {
    let username = link.substring(link.indexOf("com/") + 4);

    if (linkedin) {
      username = link.substring(link.indexOf("in/") + 3)
    }

    return <a href={link} target="_blank">{username}</a>;
  };

  _renderWebsite = (link) => {
    let initial = "";
    let ending = "";

    if (link.length > 25) {
      initial = link.substring(0, 15);
      ending = link.substring(link.length, link.length - 10);

      return <a href={link} target="_blank" title={link}>{initial} ... {ending}</a>;
    }

    return link;
  };

  render() {
    const { myself } = this.state;

    if (!myself) {
      return <Loading />
    }

    return (
      <div id="my-account">
        <h3 className="title">My Account</h3>

        <div className="col-12 p-0 session-block about">
          <div className="row p-0 d-flex align-items-center">
            <div className="p-0 col-lg-8 col-md-6 col-sm-12 h-auto about-bio d-flex align-items-center">
              <div className="col-lg-3 p-0 about-image">
                {
                  myself.profile_picture
                    ? <img src={myself.profile_picture} className="w-100"alt=""/>
                    : <img src="./no-user-image.svg"alt=""/>
                }
              </div>
              <div className="col-lg-7 p-0">
                <h3>{myself.first_name} {myself.last_name}</h3>
                <p>{myself.bio}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 about-contact">
              <div>
                <img src="./email.svg" alt=""/> <span>E-mail Address</span>
                <p>{myself.email}</p>
              </div>
              <br />
              <br />
              <div>
                <img src="./company.svg" alt=""/> <span>Company</span>
                <p>Lorem Ipsum</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row p-0">
            <div className="col-lg-4 col-md-12 col-sm-12 session-block external-links">
              <div className="row p-0 d-flex align-items-center">
                <h3 className="title w-100">External Links</h3>
                <div className="link w-100">
                  <div className="image text-center float-left"><img src="./computer.svg" alt=""/></div>
                  {(myself.website && this._renderWebsite(myself.website)) || <span className="small text-muted">No website</span>}
                </div>

                <div className="link w-100">
                  <div className="image text-center float-left"><img src="./facebook.svg" alt=""/></div>
                  {(myself.facebook_profile && this._renderSocialMedia(myself.facebook_profile)) || <span className="small text-muted">No Facebook</span>}
                </div>

                <div className="link w-100">
                  <div className="image text-center float-left"><img src="./twitter.svg" alt=""/></div>
                  {(myself.twitter_profile && this._renderSocialMedia(myself.twitter_profile)) || <span className="small text-muted">No Twitter</span>}
                </div>

                <div className="link w-100">
                  <div className="image text-center float-left"><img src="./linkedin.svg" alt=""/></div>
                  {(myself.linkedin_profile && this._renderSocialMedia(myself.linkedin_profile, true)) || <span className="small text-muted">No LinkedIn</span>}
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 introduction-video">
              {
                myself.youtube_video
                  ? <YouTube
                      opts={{
                        height: 542,
                        width: 915,
                        playerVars: {
                          autoPlay: 0
                        }
                      }}
                      videoId={myself.youtube_video.substring(myself.youtube_video.indexOf("=") + 1)}
                    />
                  : <FontAwesomeIcon icon="video-slash" className="no-video-icon"/>
              }
            </div>
          </div>
        </div>

        <div>
          <h3 className="title">Account Status</h3>
          <div className="row p-0 account-status">
            <div className="col-lg-4 col-sm-12">
              <div className="session-block text-center">
                <div className="image grad-orange">
                  <img src="./trust-level.svg " alt=""/>
                </div>
                <h4>Trust Level</h4>
                <span className="number">0</span>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="session-block text-center">
                <div className="image grad-purple">
                  <img src="./deals-completed.svg " alt=""/>
                </div>
                <h4>Deals Completed</h4>
                <span className="number">0</span>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="session-block text-center">
                <div className="image grad-yellow">
                  <img src="./on-going-deals.svg " alt=""/>
                </div>
                <h4>On Going Deals</h4>
                <span className="number">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyAccount;