import React, { useState } from 'react';
import "./Navigation.css"
import Logo from "../assets/image/logo.png"
import { FaBars, FaTimes } from 'react-icons/fa';
import {  Link, NavLink} from "react-router-dom";

const Navigation = ({ user, setLoginUser }) => {
    const [showMenu, setShowMenu] = useState(false);
    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        setShowMenu(false);
    };

    const handleLogout = () => {
        setLoginUser({});
        localStorage.removeItem('user');
        window.scrollTo(0, 0);
        setShowMenu(false);
    };

    return (
        <div className="navbar-container">
            <div className="navbar__logo">
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                    <img src={Logo} alt="" />
                </NavLink>
            </div>

            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`phone-nav ${showMenu ? 'show' : ''}`}>
                <div className="nav__content bd-grid">
                    <div className="nav__menu">
                        <ul>
                            <li className="nav__item">
                                <NavLink to="/" className="nav__link" onClick={handleLinkClick}>
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav__item">
                                <NavLink to="/layout" className="nav__link" onClick={handleLinkClick}>
                                    Building Layout
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/inventory" className="nav__link" onClick={handleLinkClick}>
                                    Inventory
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/add-inventory" className="nav__link" onClick={handleLinkClick}>
                                    Add Inventory
                                </NavLink>
                            </li>

                            {user && user._id ? (
                                <>
                                    <li className="nav__item">
                                        <button className="nav__link login-btn" onClick={handleLogout}>
                                            Hey! {user.name} (Logout)
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav__item">
                                        <Link to="/login" className="nav__link login-btn" onClick={handleLinkClick}>
                                            Login
                                        </Link>
                                        
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
