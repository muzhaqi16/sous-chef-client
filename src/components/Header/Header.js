import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../img/logo.png';

export default class Header extends Component {
    handleLogoutClick = () => {
        console.log('Logged out');
    }

    renderLogoutLink() {
        return (<div>
            <Link onClick={this.handleLogoutClick} to='/'> Logout</Link>
        </div>)
    }

    renderLoginLink() {
        return (
            <div>
                <Link to='/register'> Register</Link>
                <Link to='/login'>Log in</Link>
            </div>
        )
    }
    render() {
        return (
            <nav role="navigation">
                <Link to="index.html" id="logo-link"><img src={logo} alt="sous chef logo" id="logo" /></Link>
                <ul id="main-nav">
                    <li><Link to="index.html">Home</Link></li>
                    <li><Link to="">Log In</Link></li>
                    <li><Link to="">Contact</Link></li>
                </ul>
            </nav>
        )
    }
}





