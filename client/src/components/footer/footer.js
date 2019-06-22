import React from 'react';
import './footer.css';
const Footer = () => {
    console.log('render footer..');
    const footerText = `© 2019 Groupon Inc. All rights reserved.`;
    return (
        <footer className="footer-container">
            <img alt="groupon logo" className="footerLogo" src='/images/groupon.png'></img>
            <label>{footerText}</label>
        </footer>
    );
};
export default Footer;