import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'
import logo from '../../img/logo.png';

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
    }

    renderLogoutLink() {
        return (<div>
            <a onClick={this.handleLogoutClick} href='/'> Log out</a>
        </div>)
    }

    renderLoginLink() {
        return (
            <div>
                <Link to='/login'>Log in</Link>
            </div>
        )
    }
    render() {
        return (
            <nav role="navigation">
                <Link to="/" id="logo-link"><img src={logo} alt="sous chef logo" id="logo" /></Link>
                <div className="menu">
                    <button id="nav-toggle">&#9776;</button>
                    <ul id="main-nav">
                        <li><Link to="/">Home</Link></li>
                        <li>
                            {TokenService.hasAuthToken()
                                ? this.renderLogoutLink()
                                : this.renderLoginLink()}
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}





