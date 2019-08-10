import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GroceriesContext from './../../contexts/GroceriesContext';
import GroceryItem from '../GroceriesItem/GroceriesItem'
import './GroceriesPage.css';

export default class GroceriesPage extends Component {
    static contextType = GroceriesContext;
    state = { error: null }

    handleAddToShoppingList = name => {
        this.setState({ error: null })
        const status = this.context.addShoppingListItem({
            "name": name,
            "checked": false
        });
        (!status && this.setState({ error: 'Item is already on your shopping list' }))
    }
    render() {
        const { error } = this.state
        const { groceries = [] } = this.context.data;
        const filter = this.props.match.params.path;
        const groceryList = groceries.map(items => {
            if (filter === "all" || items.location === filter) {
                return <GroceryItem groceryItem={items} key={items.id} addToList={this.handleAddToShoppingList} />
            }
            return false;
        }
        )
        return (
            <div className="GroceriesPage">
                <div className="options">
                    <Link to="/add_groceries">Add items <FontAwesomeIcon icon={faPlus} /></Link>
                    <Link to="all">All</Link>
                    <Link to="Freezer">Freezer</Link>
                    <Link to="Fridge">Fridge</Link>
                    <Link to="Pantry">Pantry</Link>
                </div>
                <section className="GroceryList">
                    <div id="error_alert" role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <ul>
                        {groceryList}
                    </ul>
                </section>
            </div>
        )
    }
}
