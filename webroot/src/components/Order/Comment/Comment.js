import React, { Component } from "react";
import Loading2 from "../../common/Loading2";
import { timeFromNow } from "../../../modules/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            message: "",
            isLoading: true,
            isCommenting: false,
        };

        this._fetchComments = this._fetchComments.bind(this)
    }

    componentDidMount() {
        this._fetchComments();
    }

    _fetchComments() {
        const { reservation, ico, myself, match: { params } } = this.props;

        // Get comments
        window.http.get(`order/${ico.uuid}/${reservation.id}/comments`)
            .then(({ data: { comments } }) => {
                this.setState({ comments, isLoading: false })
                this._scrollToBottom();
            }).catch(({data}) => {
                window.alert.error(data.error)
            });
    }

    componentDidUpdate(){
        this._scrollToBottom();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    /**
     * Submit message
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onSubmit = (e) => {
        const { message, isCommenting } = this.state;
        const { reservation, ico } = this.props;
        let reservation_id = reservation.id;

        e.preventDefault();
        this.setState({ isCommenting:true })
        if (message.length > 0 && !isCommenting) {
            window.http.post(`order/${ico.uuid}/${reservation.id}/comments/store`, { message, reservation_id })
                .then(({ data }) => {
                    this._fetchComments();
                    window.alert.success(data.message)
                    this.setState({ isCommenting:false, message: '' })
                }).catch(({ data }) => {
                    this.setState({ isCommenting:false })
                    window.alert.error(data.error)
                });
        }
    };

    _scrollToBottom = () => {
        const element = document.getElementById("window");
        element.scrollTop = element.scrollHeight;
    };

    _renderLoading = () => {
        return <div className="message">
            <Loading2 />
        </div>
    };

    _renderOtherMessage = (picture, { id, data: { message }, created_at }) => {
        return <div key={id} className="message row p-0">
            <div className="col-lg-2">
                <div className="image">
                    <img src={picture || "/no-user-image.jpg"} className="w-100"/>
                </div>
            </div>
            <div className="col-lg-10 balloon receiving">
                {message}
            </div>
            <div className="font-italic float-left message-created message-owner">{timeFromNow(created_at)}</div>
        </div>
    };

    _renderMyMessage = ({id, data: { message }, created_at}) => {
        return <div key={id} className="message">
            <div className="col-lg-7 balloon sending">
                {message}
            </div>
            <div className="font-italic float-right message-created">{timeFromNow(created_at)}</div>
        </div>
    };

    _renderEmptyConversation = () => {
        return <div className="text-center no-message">
            <div className="image m-auto" style={{ width: 120, height: 120 }}>
                <img src="/handshake.svg" alt="" className="w-100"/>
            </div>
            <h1>Say hello!</h1>
            <p className="text-muted small mt-3 mb-0">You still haven't started a conversation.</p>
            <p className="text-muted small">You can ask anything you want about about the trade.</p>
        </div>
    };

    _renderMessages = () => {
        const { comments, isLoading } = this.state;
        const { ico, myself } = this.props;

        if (isLoading) {
            return this._renderLoading();
        }

        if (comments && !comments.length && !isLoading) {
            return this._renderEmptyConversation();
        }

        return comments && comments.map((comment) => {
            return comment.data.speaker_id === myself.id
            ? this._renderMyMessage(comment)
            : this._renderOtherMessage(ico.user.profile_picture, comment)
        });
    };

    render() {
        const { message, isCommenting, comments } = this.state;

        return (
            <div>
                {comments.length > 0 ? <h4 className="mt-5">Messages</h4> : null}
                <div className="chat session-block col-lg-12">
                    <div id="window" className="window">
                        <div className="messages">
                            {this._renderMessages()}
                        </div>
                    </div>
                    <form className="bottom row" onSubmit={this.onSubmit}>
                        <div className="col-11 pr-0">
                            <input
                                type="text"
                                name="message"
                                className="form-control"
                                value={message}
                                placeholder="Type something..."
                                onChange={this.onChange}
                                disabled={isCommenting}
                                />
                        </div>
                        <div className="col-1 send-button">
                            {isCommenting ? <FontAwesomeIcon icon="spinner" spin className="mr-2" />
                            : <img src="/send.svg" alt="" onClick={this.onSubmit} /> }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
