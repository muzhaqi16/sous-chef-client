import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';
import './AddGroceriesPage.css';

export default class AddGroceries extends Component {
    static contextType = GroceriesContext;

    handleSubmit = ev => {
        ev.preventDefault();
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/groceries/all'
        const { name, category, storageLocation, reminder, quantity, expiration, unit, notes } = ev.target;
        const id = this.context.data.groceries[this.context.data.groceries.length - 1].id;
        const newItem = {
            "id": parseInt(id) + 1,
            "name": name.value,
            "category": category.value,
            "location": storageLocation.value,
            "expires": expiration.value,
            "reminder": reminder.value,
            "quantity": quantity.value,
            "unit": unit.value,
            "notes": notes.value
        }
        console.log(newItem);
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
                        <select id="category" required name="category">
                            <option value="dry">Dry Goods</option>
                            <option value="veg">Vegetables</option>
                            <option value="herbs">Herbs &amp; Spices</option>
                            <option value="oils">Oils &amp; Spices</option>
                            <option value="frozen">Frozen</option>
                            <option value="canned">Canned Foods</option>
                            <option value="bottles">Bottles &amp; Jars</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='location'>Storage Location</label>
                        <select id="location" required name="storageLocation">
                            <option value="freezer">Freezer</option>
                            <option value="fridge">Fridge</option>
                            <option value="pantry">Pantry</option>
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
                            <option value="piece">Piece(s)</option>
                            <option value="bag">Bag(s)</option>
                            <option value="pckg">Package(s)</option>
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
