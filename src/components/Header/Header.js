import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'
import logo from '../../img/logo.png';

export default class Header extends Component {
    state = {
        hidden: true
    };
    handleLogoutClick = () => {
        this.setState({ hidden: !this.state.hidden })
        TokenService.clearAuthToken();
    }
    handleClick = () => {
        this.setState({ hidden: !this.state.hidden })
    }
    renderLogoutLink() {
        return (<div>
            <a onClick={this.handleLogoutClick} href='/'> Log out</a>
        </div>)
    }

    renderLoginLink() {
        return (
            <div>
                <Link to='/login' onClick={() => this.setState({ hidden: !this.state.hidden })}>Log in</Link>
            </div>
        )
    }
    render() {
        return (
            <nav role="navigation">
                <Link to="/" id="logo-link"><img src={logo} alt="sous chef logo" id="logo" /></Link>
                <div className="menu">
                    <ul id="main-nav" className={this.state.hidden ? "hidden" : ""}>
                        <li><Link to="/" onClick={() => this.setState({ hidden: !this.state.hidden })}>Home</Link></li>
                        <li><Link to="/groceries/all" onClick={() => this.setState({ hidden: !this.state.hidden })}>Groceries</Link></li>
                        <li><Link to="/recipes" onClick={() => this.setState({ hidden: !this.state.hidden })}>Recipes</Link></li>
                        <li><Link to="/shopping_list" onClick={() => this.setState({ hidden: !this.state.hidden })}>Shop List</Link></li>
                        <li>
                            {TokenService.hasAuthToken()
                                ? this.renderLogoutLink()
                                : this.renderLoginLink()}
                        </li>
                        <li><Link to="/contact" onClick={() => this.setState({ hidden: !this.state.hidden })}>Contact</Link></li>
                    </ul>
                    <button id="nav-toggle" onClick={this.handleClick}>&#9776;</button>
                </div>
            </nav>
        )
    }
}





