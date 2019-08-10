import React, { Component } from 'react'
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GroceriesContext from './../../contexts/GroceriesContext';
import './ShoppingListPage.css';

export default class ShoppingListPage extends Component {
    static contextType = GroceriesContext;
    state = { error: null }
    handleAddItem = ev => {
        ev.preventDefault();
        this.setState({ error: null })
        const { name } = ev.target;
        if (!name.value.trim()) {
            this.setState({ error: 'The item name can not be empty' });
            return false;
        }
        const newItem = {
            "name": name.value
        }
        this.context.addShoppingListItem(newItem);
        ev.target.reset();
    }
    handleDelete(name) {
        this.context.removeShoppingListItem(name);
    }
    render() {
        const { shoppingList = [] } = this.context.data;
        const { error } = this.state
        const itemsList = shoppingList.map(item => {
            return <li className="shopping-item" key={item.name}>
                <div className="status">
                    <input type="checkbox" className="unchecked" />
                </div>

                <div className="item-name">
                    <h3>{item.name} &nbsp;</h3>
                </div>
                <FontAwesomeIcon className="remove" icon={faTrash} onClick={() => this.handleDelete(item.name)} title="Delete this item from your list" />
            </li>
        }
        )
        return (
            <div className="shoppingListPage">
                <h1>This is your ShoppingListPage</h1>

                <section className="shoppingList">

                    <form onSubmit={this.handleAddItem}>
                        <input type="text" placeholder="To buy" name="name" required /><button type="submit"><span>Add </span><FontAwesomeIcon icon={faCartPlus} /></button>
                        <div role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                    </form>

                    <ul>
                        {itemsList}
                    </ul>
                </section>
            </div>
        )
    }
}
