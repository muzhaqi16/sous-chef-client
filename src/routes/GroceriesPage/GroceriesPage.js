import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';

import './GroceriesPage.css';

export default class GroceriesPage extends Component {
    static contextType = GroceriesContext;
    render() {
        // let { groceries = [] } = this.context.data;

        return (
            <div className="GroceriesPage">
                <h1>View items from your freezer fridge or pantry</h1>
                <section>
                    <ul>

                    </ul>
                </section>
            </div>
        )
    }
}
