import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

                </div>
                <section className="GroceryList">
                    <ul>
                        {groceries.map(items =>
                            <GroceriesListPage groceryItem={items} key={items.id} />
                        )}
                        <Link to="/add_groceries">Add items<FontAwesomeIcon icon={faPlus} /></Link>
                    </ul>
                </section>
            </div>
        )
    }
}
