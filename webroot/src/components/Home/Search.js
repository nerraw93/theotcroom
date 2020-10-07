import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Search extends Component {
    render() {

        return (
            <div className="text-center">
                <span className="search-input">
                    <h1>Safe and free peer to peer cryptocurrency marketplace</h1>
                    <input
                        className="text-center"
                        placeholder="Search for a token..."
                        onChange={this.props.search}
                        />
                </span>
            </div>
        )
    }
}

Search.propTypes = {
    search: PropTypes.func.isRequired,
};
