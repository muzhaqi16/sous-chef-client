import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GroceriesContext from './../../contexts/GroceriesContext';
import config from '../../config'
import './AddGroceriesPage.css';

export default class AddGroceries extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };
    static contextType = GroceriesContext;

    state = {
        error: null,
    };

    handleSubmit = ev => {
        ev.preventDefault();

        const { location, history } = this.props
        const destination = (location.state || {}).from || '/groceries/all'


        const { name, category, storageLocation, reminder, quantity, unit, notes } = ev.target;
        const newGroceryItem = {
            "name": name.value,
            "category": category.value,
            "location": storageLocation.value,
            "expiry_reminder": reminder.value,
            "quantity": quantity.value,
            "unit": unit.value,
            "notes": notes.value,
            "price": 1.55,
            "image": 'undefined',
            "user_id": 1

        }
        this.setState({ error: null })

        fetch(config.API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newGroceryItem),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                this.context.addGrocery(data)
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
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
                        <select id="category" required name="category">
                            <option value="Dry Goods">Dry Goods</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Herbs and Spices">Herbs &amp; Spices</option>
                            <option value="Oils">Oils &amp; Spices</option>
                            <option value="Frozen">Frozen</option>
                            <option value="Canned Foods">Canned Foods</option>
                            <option value="Bottles">Bottles</option>
                            <option value="Jars">Jars</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='location'>Storage Location</label>
                        <select id="location" required name="storageLocation">
                            <option value="Freezer">Freezer</option>
                            <option value="Fridge">Fridge</option>
                            <option value="Pantry">Pantry</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="reminder">Expiry date reminder </label>
                        <input type="checkbox" id="reminder" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="expiry-date">Expiry date </label>
                        <input type="date" id="expiry-date" name="expiration" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="quantity"> Quantity </label><br />
                        <input type="number" id="quantity" defaultValue="1" max="100" min="1" name="quantity" />

                        <select id="unit" name="unit">
                            <option value="lbs">Pound(s)</option>
                            <option value="kg">Kilogram(s)</option>
                            <option value="pieces">Piece(s)</option>
                            <option value="Bag">Bag(s)</option>
                            <option value="container">Package(s)</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Notes</label>
                        <textarea name="notes"></textarea>
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
