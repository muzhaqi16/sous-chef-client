import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';
import './AddGroceriesPage.css';

export default class AddGroceries extends Component {
    static contextType = GroceriesContext;

    handleSubmit = ev => {
        ev.preventDefault();
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/groceries'
        const { name, category } = ev.target;
        const id = this.context.data.groceries[this.context.data.groceries.length - 1].id;
        const newItem = {
            "id": parseInt(id) + 1, "name": name.value, "category": category.value
        }
        this.context.addGroceries(newItem);
        history.push(destination);
    }
    render() {
        return (
            <section className="add-grocery-items-section">
                <form onSubmit={this.handleSubmit} method="post" id="add-groceries-form">
                    <h2>Add Groceries</h2>
                    <fieldset>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id="name" required aria-label='Enter grocery item name...' name='name' tabIndex="1" autoFocus placeholder="Grocery item name" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor='category'>Category</label>
                        <input type="text" id="category" required name="category"></input>
                    </fieldset>
                    <fieldset>
                        <label for="reminder">Expiry date reminder</label>
                        <input type="checkbox" id="reminder" />
                    </fieldset>
                    <fieldset>
                        <label for="expiry-date">Expiry date</label>
                        <input type="date" id="expiry-date" />
                    </fieldset>
                    <button type='submit'>
                        Add Item
                    </button>
                    <button type='submit'>
                        Cancel
                    </button>
                </form>
            </section>
        )
    }
}
