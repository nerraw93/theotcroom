import React, { Component } from "react";
import Switch from 'react-toggle-switch';

class SwitchMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            switched: false,
        }
    }

    toggleSwitch = () => {
        this.props.onMemberToggle(this.props.user);
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;

        if (user) {
            let isBanned = false;

            if (user.users.is_banned) {
                isBanned = true;
            } else {
                isBanned = false;
            }

            this.setState({ switched: isBanned });
        }
    }

    render() {
        let {user} = this.props;

        let switchState = true;

        if (user.users.is_banned == 1) {
            switchState = false;
        }

        return (
            <Switch onClick={this.toggleSwitch} on={switchState}/>
        )
    }
}

export default SwitchMember;
