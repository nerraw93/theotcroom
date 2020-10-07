import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { isNull } from 'lodash';

class Input extends Component {
    render() {
        let { label, type, name, value, placeholder, className, onChange, isFormGroup, disabled, min, minLength, maxLength, onKeyPress } = this.props;
        if (isNull(value))
            value = '';

        return (
            <div className={cx(isFormGroup && "form-group")}>
                { label && <label>{label}</label> }
                <input
                    type={type}
                    name={name}
                    value={value}
                    className={cx("form-control", className)}
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    min={min}
                    onKeyPress={onKeyPress}
                    />
            </div>
        )
    }
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    className: PropTypes.string,
    isFormGroup: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    disabled: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    min: PropTypes.number,
};

Input.defaultProps = {
    type: "text",
    isFormGroup: true,
    disabled: false,
};

export default Input;
