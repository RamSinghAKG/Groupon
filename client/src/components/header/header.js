import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './header.css';
import Search from '../UI/search';
export const Header = (props) => {
    const customHeader = props.isNormalHeader ? '' : (
        <React.Fragment><Search></Search>
        <Link to="/create">Add Book</Link></React.Fragment>);
    return (
        <div className="header-container">
            <Link className="logo" to="/">GROUPON</Link>
            {customHeader}
        </div>
    );
};

Header.propTypes = {
    isNormalHeader: PropTypes.bool
};
