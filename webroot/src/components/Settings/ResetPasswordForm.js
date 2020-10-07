import React, {Component} from "react";
import Input from "../common/Input";

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      current_password: "",
      new_password: "",
      confirm_password: "",
      isLoading: false,
    };

    this.state = this.defaultState;
  }

  componentWillReceiveProps(nextProps) {
    const { prop } = nextProps;

    if (prop.success) {
      this.setState({ ...this.defaultState });
    }

    this.setState({ isLoading: prop.processing })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  _handleReset = () => {
    this.setState({ ...this.defaultState });
  };

  _handleOnSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
  };

  render() {
    const {
      current_password,
      confirm_password,
      new_password,
      isLoading
    } = this.state;

    return (
      <div>
        <Input type="password" name="current_password" value={current_password} className="form-control" placeholder="Current Password" onChange={this.onChange}/>
        <Input type="password" name="new_password" value={new_password} className="form-control" placeholder="New Password" onChange={this.onChange}/>
        <Input type="password" name="confirm_password" value={confirm_password} className="form-control" placeholder="Confirm Password" onChange={this.onChange}/>
        <button className="btn btn-blue float-right" onClick={this._handleOnSubmit} disabled={isLoading}>UPDATE</button>
        <button className="btn btn-white float-right" onChange={this._handleReset} disabled={isLoading}>CANCEL</button>
      </div>
    )
  }
}

ResetPasswordForm.propTypes = {};

export default ResetPasswordForm