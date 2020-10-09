import React from "react";
import PropTypes from "prop-types";
// import { isNull } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Button component with loading icon and state
 * @param       {[type]}  label        [description]
 * @param       {[type]}  type         [description]
 * @param       {[type]}  onClick      [description]
 * @param       {Boolean} isLoading    [description]
 * @param       {Boolean} isCapitalize [description]
 * @param       {[type]}  extraClass   [description]
 * @constructor
 */
export function Button({ label, type, onClick, isLoading, isCapitalize, extraClass }) {
    let capitalize;
    if (isCapitalize)
        capitalize = 'text-capitalize'

    return (
        <button className={`btn btn-${type} ${extraClass} ${capitalize}`}
            onClick={onClick}
            disabled={isLoading}>
            {isLoading ? <FontAwesomeIcon icon="spinner" spin className="mr-2" /> : null}
            {label}
        </button>
    );
}

Button.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    extraClass: PropTypes.string,
    isCapitalize: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

Button.defaultProps = {
    label: "submit",
    isCapitalize: true,
    type: 'primary'
};
