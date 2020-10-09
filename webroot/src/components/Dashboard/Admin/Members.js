import React, { Component } from "react";
import User from "../Members/User";
import Loading2 from "../../common/Loading2";
import ConfirmDialog from "../../common/ConfirmDialog";
// import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
import DetailsModal from "../Members/DetailsModal";

export default class Members extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            search: "",
            isLoading: true,
            countSummary: {
                all: 0,
                recent: 0,
                banned: 0
            },
            filter: 'all',

            isBannedDialogShow: false,
            userToBeDisabled: null,
            isActionDisabled: false,
            dialogMessage: '',

            // User details
            isShowUserDetails: false,
            userDetailsUserId: null,
        }

        this._filterUser = this._filterUser.bind(this)
        this._disableOrEnableAccount = this._disableOrEnableAccount.bind(this)
        this._cancelDisableEnableAccount = this._cancelDisableEnableAccount.bind(this)
        this._confirmDisableEnableAccount = this._confirmDisableEnableAccount.bind(this)
        this._showUserDetails = this._showUserDetails.bind(this)
        this._closeUserDetails = this._closeUserDetails.bind(this)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            this._summaryCount();
            this._fetchUsers();
        }
    }

    _summaryCount() {
        // Get summary - count
        window.http.get('admin/dashboard/members/summary')
            .then(({ data }) => {
                if (this._isMounted) {
                    this.setState({ countSummary: data });
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    /**
     * Filter user
     * @param  {[type]} filter [description]
     */
    _filterUser(filter) {
        this.setState({ filter, isLoading: true, users: [] });
        this._fetchUsers(filter)
    }

    /**
     * Fetch users
     * @param  {String} [filter='all'] [description]
     * @return {[type]}                [description]
     */
    _fetchUsers(filter = 'all', search = '') {
        window.http.get('admin/dashboard/members', { filter, search })
            .then(({ data: { users } }) => {
                if (this._isMounted) {
                    this.setState({ users, isLoading: false });
                }

            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    _renderUsers = () => {
        const { users, isLoading } = this.state;

        if (isLoading) {
            return <Loading2 />
        }

        if (users.length === 0)
            return (<div className="col-12 app-message"><h4 className="text-info">Nothing found.</h4></div>)
        return users.map(user => {
            return (
                <User key={user.id} user={user} showUserDetails={this._showUserDetails} disableOrEnableAccount={this._disableOrEnableAccount} enableAccount={this._enableAccount}/>
            )
        })
    };

    _disableOrEnableAccount({ uuid }, isEnabled = false) {
        // Show confirm dialog
        let message = `Are you sure you want to ${isEnabled ? 'enable' : 'disable'} this account?`;
        if (isEnabled) {
            this.setState({
                isBannedDialogShow: true,
                userToBeDisabled: uuid,
                dialogMessage: message,
                isActionDisabled: false
            });

        } else {
            this.setState({
                isBannedDialogShow: true,
                userToBeDisabled: uuid,
                dialogMessage: message,
                isActionDisabled: true
            });
        }

    }

    _cancelDisableEnableAccount() {
        this.setState({ isBannedDialogShow: false, userToBeDisabled: null });
    }

    _confirmDisableEnableAccount() {
        const { userToBeDisabled, filter, isActionDisabled } = this.state;
        window.http.post(`admin/user/${userToBeDisabled}/${isActionDisabled ? 'disable' : 'enable'}`).then(({ data }) => {
                window.alert.success(data.message);
                this._cancelDisableEnableAccount();
                this._summaryCount();
                this._filterUser(filter);
            })
            .catch(({data}) => {
                window.alert.error(data.error);
            });
    }

    _searchUser = (e) => {
        e.persist();

        if (!this.debouncedFn) {
            this.debouncedFn = debounce(() => {
                const { value } = e.target;

                this.setState({ isLoading: true, users: [], search: value });
                if (value.length > 2)
                    this._fetchUsers(this.state.filter, value)
                else
                    this._fetchUsers(this.state.filter)

            }, 1000);
        }
        this.debouncedFn();

    };

    _showUserDetails(id) {
        this.setState({ isShowUserDetails: true, userDetailsUserId: id })
    }

    _closeUserDetails() {
        this.setState({ isShowUserDetails: false, userDetailsUserId: null })
    }

    render() {
        let {
            filter, countSummary: {all, recent, banned},
            isBannedDialogShow, dialogMessage,
            isShowUserDetails,  userDetailsUserId
        } = this.state;

        return (
            <div className="recent-members session-block row">
                <ConfirmDialog cancel={this._cancelDisableEnableAccount} confirm={this._confirmDisableEnableAccount}
                    isShow={isBannedDialogShow} message={dialogMessage} />
                <DetailsModal userId={userDetailsUserId} isShow={isShowUserDetails}
                    close={this._closeUserDetails} />
                <div className="col-12 p-0">
                    <div className="row">
                        <div className="col-6 p-0 text-left">
                            <div className="img float-left">
                                <img src="/users.svg" alt=""/>
                            </div>
                            <h3 className="mb-5">Members</h3>
                        </div>
                    </div>
                </div>
                <div className="col-12 pl-0 pr-0">
                    <ul className="app-nav nav">
                        <li className="nav-item" onClick={() => this._filterUser('all')}>
                            <span className={`nav-link ${filter === 'all' ? 'active' : ''}`}>All Members ({all})</span>
                        </li>
                        <li className="nav-item" onClick={() => this._filterUser('recent')}>
                            <span className={`nav-link ${filter === 'recent' ? 'active' : ''}`}>Recent Members ({recent})</span>
                        </li>
                        <li className="nav-item" onClick={() => this._filterUser('banned')}>
                            <span className={`nav-link ${filter === 'banned' ? 'active' : ''}`}>Banned Members ({banned})</span>
                        </li>
                    </ul>

                </div>
                <div className="col-12 mt-4 p-0">
                    <div className="search">
                        <input type="text" name="search" className="form-control" placeholder="Search here..." onChange={this._searchUser}/>
                    </div>
                </div>
                <div className="col-12 p-0">
                    <div className="row">
                        {this._renderUsers()}
                    </div>
                </div>
            </div>
        );
    }
}
