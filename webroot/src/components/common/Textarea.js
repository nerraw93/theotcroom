import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Textarea extends Component {
  render() {
    const { label, name, value, placeholder, className, onChange } = this.props;

    return (
      <div className="form-group">
        { label && <label>{label}</label> }
        <textarea
          name={name}
          className={cx("form-control", className)}
          placeholder={placeholder}
          onChange={onChange}
          cols="30"
          value={value}
          rows="7"></textarea>
      </div>
    )
  }
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  isSmall: false
};

export default Textarea;
