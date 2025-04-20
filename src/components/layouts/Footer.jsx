import React from 'react';

import logoDark from '../../assets/images/phi-black.png';
import logoLight from '../../assets/images/phi-white.png';

const Footer = ({ version, isDarkTheme }) => {
    return (
        <footer className="p-3 d-flex justify-content-between align-items-center footer position-fixed">
            <p className="footer-text"><img loading="lazy" className="footer-logo" src={isDarkTheme ? logoLight : logoDark} alt="PHI Logo" /> From PHI Corp.</p>
            <ul className="d-flex justify-content-between align-items-baseline footer-links">
                <li>
                    <a className="item-link" href="https://docs.phii.ir/linkify/api">API (soon)</a>
                </li>
                <li>
                    <a className="item-link" target="_blank" rel="noopener noreferrer" href="https://github.com/phicorp/phi-linkify">Github</a>
                </li>
                <li>
                    <p className="item-link">v{version}</p>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
