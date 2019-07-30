import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';

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
            <section>
                <h2>Add Groceries</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name" required
                        aria-label='Enter grocery item name...'
                        name='name' />
                    <label htmlFor='category'>Category</label>
                    <input type="text" id="category" required name="category"></input>
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
