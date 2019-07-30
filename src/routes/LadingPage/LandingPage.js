import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <>
                <header>
                    <h1>Welcome to Sous Chef</h1>
                    <p>The only app that is your personal chef assistant</p>
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
