import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.css';
import Search from '../UI/search';
import { ErrorBoundary } from '../errorboundary/errorboundary';
export const Header = (props) => {
    const customHeader = props.isNormalHeader ? '' : (
        <React.Fragment><Search></Search>
            <Link to="/create">Add Book</Link></React.Fragment>);
    return (
        <ErrorBoundary>
            <div className="header-container">
                <Link className="logo" to="/">GROUPON</Link>
                {customHeader}
            </div>
            <div className="error-message"> {props.error} </div>
        </ErrorBoundary>
    );
};

Header.propTypes = {
    isNormalHeader: PropTypes.bool,
    error: PropTypes.string
};
