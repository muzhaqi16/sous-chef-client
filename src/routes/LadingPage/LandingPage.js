import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <header className="hero">
                    <h1>Welcome to <br /> Sous Chef</h1>
                    <p>The only kitchen assistant that helps you <br /> <span className="stand-out">save food waste</span> and <span className="stand-out">stay healthy</span></p>
                </header>

                <section>
                    <Link to="groceries/all">Your Groceries</Link>
                </section>
                <section>
                    <Link to="recipes">Generate Recipes</Link>
                </section>
                <section>
                    <Link to="shopping_list">Shopping list</Link>
                </section>
            </>
        )
    }
}
