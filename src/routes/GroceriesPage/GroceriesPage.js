import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import GroceriesContext from './../../contexts/GroceriesContext';
import GroceriesListPage from './../GroceriesListPage/GroceriesListPage'
import './GroceriesPage.css';

export default class GroceriesPage extends Component {
    static contextType = GroceriesContext;
    render() {
        let { groceries = [] } = this.context.data;

        return (
            <div className="GroceriesPage">
                <h1>View items from your freezer fridge or pantry</h1>
                <div>
                    <button>Freezer</button>
                    <button>Fridge</button>
                    <button>Pantry</button>
                    <Link to="/add_groceries">Add items</Link>
                </div>
                <section className="GroceryList">
                    <ul>
                        {groceries.map(items =>
                            <GroceriesListPage groceryItem={items} key={items.id} />
                        )}

                    </ul>
                </section>
            </div>
        )
    }
}
