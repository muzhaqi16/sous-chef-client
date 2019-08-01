import React, { Component } from 'react'
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GroceriesContext from './../../contexts/GroceriesContext';
import './ShoppingListPage.css';

export default class ShoppingListPage extends Component {
    static contextType = GroceriesContext;
    handleAddItem = ev => {
        ev.preventDefault();
        const { name } = ev.target;
        const newItem = {
            "id": Math.floor((Math.random() * 100) + 1),
            "name": name.value
        }
        this.context.addShoppingListItem(newItem);
        ev.target.reset();
    }
    render() {
        const { shoppingList = [] } = this.context.data;

        const itemsList = shoppingList.map(items => {
            return <li className="shopping-item" key={items.id}>
                <div className="status">
                    <input type="checkbox" className="unchecked" /> <input type="checkbox" className="checked" />
                </div>

                <div className="item-name">
                    <h3>{items.name} </h3>
                    <p> {items.quantity} {items.unit} </p>
                </div>
                <FontAwesomeIcon className="remove" icon={faTrash} onClick={this.handleDelete} title="Delete this item from your list" />
            </li>
        }
        )
        return (
            <div className="shoppingListPage">
                <h1>This is your ShoppingListPage</h1>

                <section className="shoppingList">
                    <form onSubmit={this.handleAddItem}>
                        <input type="text" placeholder="To buy" name="name" /><button type="submit">Add <FontAwesomeIcon icon={faCartPlus} /></button>
                    </form>

                    <ul>
                        {itemsList}
                    </ul>
                </section>
            </div>
        )
    }
}
