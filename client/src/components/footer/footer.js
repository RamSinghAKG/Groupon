import React from 'react';
import ErrorBoundary from 'components/errorboundary/errorboundary';
import './footer.css';
const Footer = (props) => {
    console.log('render footer..');
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