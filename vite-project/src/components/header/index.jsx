// import React from 'react';
import './style.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <div className="logo-div" />
                <a href="#home" className="logo-text">GreenCode</a>
            </div>
            <nav>
                <ul className="nav-links">
                    <li className="link-container"><a className="link" href="#home">Home</a></li>
                    <li className="link-container"><a className="link" href="#about">About</a></li>
                    <li className="link-container"><a className="link" href="#services">Services</a></li>
                    <li className="link-container"><a className="link" href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;