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
        const { groceries = [] } = this.context.data;
        const filter = this.props.match.params.path;
        const groceryList = groceries.map(items => {
            if (filter === "all" || items.location === filter) {
                return <GroceriesListPage groceryItem={items} key={items.id} />
            }
            return false;
        }
        )
        return (
            <div className="GroceriesPage">
                <h1>View items from your freezer fridge or pantry</h1>
                <div>
                    <Link to="all">All</Link>
                    <Link to="freezer">Freezer</Link>
                    <Link to="fridge">Fridge</Link>
                    <Link to="pantry">Pantry</Link>

                </div>
                <section className="GroceryList">
                    <ul>
                        {groceryList}
                        <li><Link to="/add_groceries">Add items <FontAwesomeIcon icon={faPlus} /></Link></li>
                    </ul>
                </section>
            </div>
        )
    }
}
