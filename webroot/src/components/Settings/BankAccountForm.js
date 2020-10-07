import React, {Component} from "react";

class BankAccountForm extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: "",
      bank_name: "",
      account_name: "",
      bank_account_number: "",
      branch: "",
      bank_code: "",
      isLoading: false
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

  _handleOnSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
  };

  render() {
    const {
      name,
      bank_name,
      account_name,
      bank_account_number,
      branch,
      bank_code,
      isLoading
    } = this.state;

    return (
      <div>
        <input type="text" name="name" value={name} className="form-control" placeholder="Name" onChange={this.onChange}/>
        <input type="text" name="bank_name" value={bank_name} className="form-control" placeholder="Bank Name" onChange={this.onChange}/>
        <input type="text" name="account_name" value={account_name} className="form-control" placeholder="Account Name (Full name)" onChange={this.onChange}/>
        <input type="text" name="bank_account_number" value={bank_account_number} className="form-control" placeholder="Bank Account Number" onChange={this.onChange}/>
        <input type="text" name="branch" value={branch} className="form-control" placeholder="Branch" onChange={this.onChange}/>
        <input type="text" name="bank_code" value={bank_code} className="form-control" placeholder="Bank Code" onChange={this.onChange}/>
        <div className="form-group">
          <button className="btn btn-blue float-right" onClick={this._handleOnSubmit} disabled={isLoading}>CREATE</button>
          <button className="btn btn-white float-right" disabled={isLoading}>CANCEL</button>
        </div>
      </div>
    )
  }
}

export default BankAccountForm