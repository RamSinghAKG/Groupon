import React from 'react';
// import { Link } from 'react-router-dom';
import './footer.css';
import { ErrorBoundary } from '../errorboundary/errorboundary';
const Footer = (props) => {
    return (
        <ErrorBoundary>
            <footer className="footer-container">
                    <hr></hr>
                    <a aria-label="go to about page" target="_blank" rel="noopener noreferrer" className="about" href="https://www.groupon.com/press/about-groupon">About Groupon</a>
            </footer>
        </ErrorBoundary>
    );
};
export default Footer;