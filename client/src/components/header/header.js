import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Search from 'components/UI/search/search';
import { ErrorBoundary } from 'components/errorboundary/errorboundary';
import './header.css';
export const Header = (props) => {
    const customHeader = props.isNormalHeader ? '' : (
        <React.Fragment><Search getSearch={props.getSearch}></Search>
            <Link aria-label="go to add book page" to="/create">Add Book</Link></React.Fragment>);
    return (
        <ErrorBoundary>
            <nav aria-label="menu items" className="header-container">
                    <Link aria-label="go to home page" className="logo" to="/">GROUPON</Link>
                    {customHeader}
            </nav>
            <div aria-label="error message" className="error-message"> {props.error} </div>
        </ErrorBoundary>
    );
};

Header.propTypes = {
    isNormalHeader: PropTypes.bool,
    error: PropTypes.string,
    getSearch: PropTypes.func
};
