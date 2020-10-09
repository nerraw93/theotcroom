import React from "react";
import BaseModal from "../../../common/BaseModal";
import Loading2 from "../../../common/Loading2";
import { Button } from "../../../common/Button";
import { timeFromNow } from "../../../../modules/Utilities";

export default class ChatModal extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            isCommenting: false,
            comments: []
        }

        this._fetchComments = this._fetchComments.bind(this)
    };

    componentDidUpdate(prevProps){
        if(prevProps.buyer !== this.props.buyer) {
            this._fetchComments()
        }
    }

    _scrollToBottom = () => {
        const element = document.getElementById("window");
        element.scrollTop = element.scrollHeight;
    };

    _renderGrayBalloon = (user, { id, data: {message}, created_at }) => {
        return <div key={id} className="message row p-0">
            <div className="col-lg-2">
                <div className="image">
                    <img src={user.profile_picture || "/no-user-image.jpg"} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-lg-7 balloon receiving">
                {message}
            </div>
            <div className="font-italic float-left message-created message-owner">{timeFromNow(created_at)}</div>
        </div>
    };

    _renderBlueBalloon = ({id, data: {message}, created_at}) => {
        return <div key={id} className="message">
            <div className="col-lg-7 balloon sending">
                {message}
            </div>
            <div className="font-italic float-right message-created">{timeFromNow(created_at)}</div>
        </div>
    };

    _renderMessages = () => {
        const { myself, buyer } = this.props;
        const { comments } = this.state;

        if (!comments) {
            return <Loading2 />;
        }

        if (comments) {
            return comments.map((comment) => {
                return comment.notifiable_id === myself.id
                ? this._renderGrayBalloon(buyer, comment)
                : this._renderBlueBalloon(comment)
            });
        }
    };


    _close = () => {
        this.setState({ message: "" });
        this.close();
    };

    onChange = (e) => {
        this.setState({
            message: e.target.value
        })
    };

    renderHeader = () => {
        return <h3 className="mb-0">Reply to {this.props.buyer && this.props.buyer.first_name}</h3>
    };

    renderBody = () => {

        return (
            <div className="chat">
                <div id="window" className="window">
                    <div className="messages">
                        {this._renderMessages()}
                    </div>
                </div>
            </div>
        )
    };

    /**
     * Submit message
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    _onSubmit = (e) => {
        const { message, isCommenting } = this.state;
        const { reservationId, ico } = this.props;

        e.preventDefault();
        this.setState({ isCommenting:true })

        if (message.length > 0 && !isCommenting) {
            window.http.post(`order/${ico.uuid}/${reservationId}/comments/store`, { message, reservation_id: reservationId })
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

    _fetchComments() {
        const { reservationId, ico } = this.props;

        // Get comments
        window.http.get(`order/${ico.uuid}/${reservationId}/comments`)
            .then(({ data: { comments } }) => {
                this.setState({ comments })
                this._scrollToBottom();
            }).catch(({data}) => {
                window.alert.error(data.error)
            });
    }

    renderFooter = () => {
        const { message, isCommenting } = this.state;
        // const { sendMessage } = this.props;

        return (
            <div className="chat col-12 text-right buttons p-0">
                <div className="bottom w-100">
                    <input
                        type="text"
                        name="message"
                        className="form-control"
                        value={message}
                        placeholder="Type something..."
                        onChange={this.onChange}
                        />
                </div>
                <div className="w-100 mt-4">
                    <button
                        className="btn btn-white"
                        onClick={() => this._close()}>CANCEL</button>
                    <Button isLoading={isCommenting} type={'blue'} label={'send'} isCapitalize
                        onClick={this._onSubmit} />
                </div>
            </div>
        )
    };
}
