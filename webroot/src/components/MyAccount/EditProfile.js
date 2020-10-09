import React, { Component } from "react";
import Input from "../common/Input";
import Loading from "../common/Loading";
import Dropzone from "react-dropzone";
import { isUndefined } from 'lodash';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            company: "",
            bio: "",
            profile_picture: "",
            youtube_video: "",
            website: "",
            facebook_profile: "",
            twitter_profile: "",
            linkedin_profile: "",

            isShowLoading: true,
            isLoading: false,
        };
    }

    componentWillMount() {
        const { myself } = this.props;
        let {email} = myself;

        if (isUndefined(email)) {
            this.setState({ isShowLoading: true })

        } else {
            this.setState({
                isShowLoading: false,
                first_name: myself.first_name,
                last_name: myself.last_name,
                email: myself.email,
                company: myself.company,
                bio: myself.bio,
                profile_picture: myself.profile_picture,
                youtube_video: myself.youtube_video,
                website: myself.website,
                facebook_profile: myself.facebook_profile,
                twitter_profile: myself.twitter_profile,
                linkedin_profile: myself.linkedin_profile
            })

        }
    }

    _toggleLoading(isLoading = true)
    {
        this.setState({ isLoading: isLoading })
    }

    _openPhotoSelector = () => {
        const { dropzone } = this.refs;
        dropzone.open();
    };

    onDrop = (files) => {
        const data = new FormData();
        const { uploadPhoto, me } = this.props;

        data.append("photo", files[0]);
        uploadPhoto(data).then(({ type, payload }) => {
            if (type === 'auth:upload_photo_success') {
                let {photo} = payload;
                this.setState({ profile_picture: photo });
                me();
            }

        });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this._toggleLoading();
        const { update } = this.props;
        update({ ...this.state }).then(() => {
            this._toggleLoading(false);
        });

    };

    render() {

        const {
            first_name,
            last_name,
            email,
            bio,
            profile_picture,
            youtube_video,
            website,
            facebook_profile,
            twitter_profile,
            linkedin_profile,
            isShowLoading,
            isLoading
        } = this.state;

        if (isShowLoading)
            return <Loading/>;

        return (
            <div id="edit-profile" className="session-block">
                <Dropzone ref="dropzone"
                    accept="image/jpeg, image/png"
                    onDrop={this.onDrop}
                    style={{ display: "none" }}
                    />
                <div className="row p-0">
                    <div className="col-lg-3 image text-center">
                        <div className="wrapper m-auto">
                            <img src={profile_picture || "/no-user-image.jpg"} className="w-100" alt=""/>
                        </div>
                        <button className="btn btn-blue"
                            onClick={this._openPhotoSelector}
                            disabled={isLoading}>UPLOAD NEW AVATAR</button>
                        <button className="btn btn-white" disabled={isLoading}>Remove avatar</button>
                    </div>

                    <div className="col-lg-5 info">
                        <div className="info-block">
                            <h3>Edit Your Personal Settings</h3>
                            <div className="row p-0">
                                <div className="col">
                                    <Input name="first_name" value={first_name} placeholder="First Name" onChange={this.onChange}/>
                                </div>
                                <div className="col">
                                    <Input name="last_name" value={last_name} placeholder="Last Name" onChange={this.onChange}/>
                                </div>
                            </div>
                            <Input name="email" value={email} placeholder="E-mail Address" onChange={this.onChange}/>
                            <Input name="bio" value={bio} placeholder="Bio" onChange={this.onChange}/>
                        </div>

                        <div className="info-block">
                            <h3>Add Hello Video</h3>
                            <Input label="Video Link:" name="youtube_video" value={youtube_video} placeholder="Paste your link here" onChange={this.onChange}/>
                        </div>

                        <div className="info-block">
                            <h3>Your External Links</h3>
                            <Input label="Website URL" name="website" value={website} placeholder="Paste your link here" onChange={this.onChange}/>
                            <Input label="Facebook URL" name="facebook_profile" value={facebook_profile} placeholder="Paste your link here" onChange={this.onChange}/>
                            <Input label="Twitter URL" name="twitter_profile" value={twitter_profile} placeholder="Paste your link here" onChange={this.onChange}/>
                            <Input label="LinkedIn URL" name="linkedin_profile" value={linkedin_profile} placeholder="Paste your link here" onChange={this.onChange}/>
                        </div>
                    </div>

                    <div className="col-lg-4 buttons text-right">
                        <button disabled={isLoading} className="btn btn-white">CANCEL</button>
                        <button disabled={isLoading} className="btn btn-blue"
                            onClick={this.onSubmit}>
                            SAVE AND UPDATE
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile;
