import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GroceriesContext from './../../contexts/GroceriesContext';
import TokenService from '../../services/token-service'
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
        filteredSuggestions: [],
        currentItem: [{ name: "" }],
        currentInput: "",
        productUnit: "",
        error: null,
    };
    onKeyUp = e => {
        const currentItem = e.currentTarget.value;
        const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${currentItem}&number=5&metaInformation=true`;
        const apiKey = '6c127984799b490cbd26a4a7014b83de ';
        fetch(`${url}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.setState({
                filteredSuggestions: data,
                currentInput: currentItem
            }))
            .catch(error => {
                console.error(error.message + '. Could not search for ingredient')
            })
    }
    onClick = id => {
        const selectedItem = this.state.filteredSuggestions.filter(item => item.id === id);
        const url = `https://api.spoonacular.com/food/ingredients/${id}/information`
        const apiKey = '6c127984799b490cbd26a4a7014b83de ';
        fetch(`${url}?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.setState({ productUnit: data.shoppingListUnits }))
            .catch(error => {
                console.error(error.message + '. Could not get ingredient information')
            })
        this.setState({
            currentItem: selectedItem,
            currentInput: selectedItem[0].name,
            filteredSuggestions: []
        });
    }
    onChange = e => {
        this.setState({
            currentInput: e.currentTarget.value
        });
    };
    handleCancelButton = e => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/groceries/all'
        history.push(destination);
    }
    handleSubmit = ev => {
        ev.preventDefault();

        const { location, history } = this.props
        const destination = (location.state || {}).from || '/groceries/all'


        const { name, category, storageLocation, reminder, expiry_date, quantity, unit, notes } = ev.target;
        const newGroceryItem = {
            "name": name.value,
            "category": category.value,
            "location": storageLocation.value,
            "expiry_reminder": reminder.checked,
            "expiry_date": expiry_date.value,
            "quantity": quantity.value,
            "unit": unit.value,
            "notes": notes.value,
            "price": 1.00,
            "image": this.state.currentItem[0].image

        }
        this.setState({ error: null })

        fetch(config.API_ENDPOINT + '/groceries', {
            method: 'POST',
            body: JSON.stringify(newGroceryItem),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
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
        const filteredSuggestions = this.state.filteredSuggestions;
        const units = this.state.productUnit ? this.state.productUnit.map(unit => <option value={unit} key={unit}>{unit}</option>) : <option value="Piece">Piece</option>;
        const suggestions = filteredSuggestions.map(item => <li key={item.id} onClick={() => this.onClick(item.id)}>{item.name}</li>)
        return (
            <section className="add-grocery-items-section">
                <form onSubmit={this.handleSubmit} method="post" id="add-groceries-form" autoComplete="off">
                    <button id="close-page-button" onClick={this.handleCancelButton} title="Cancel">X</button>
                    <h2>Add Groceries</h2>
                    <fieldset>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id="name" onChange={this.onChange} value={this.state.currentInput} required aria-label='Start typing grocery item name' name='name' tabIndex="1" autoFocus placeholder="Start typing grocery item name" onKeyUp={this.onKeyUp} />
                        <ul className="suggestion-list">{suggestions}</ul>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='category'>Category</label>
                        <select id="category" required name="category">
                            <option value={this.state.currentItem[0].aisle}>{this.state.currentItem[0].aisle}</option>
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
                        <label htmlFor="reminder" id="reminder-label">Expiry date reminder </label>
                        <input type="checkbox" id="reminder" name="reminder" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="expiry-date">Expiry date </label>
                        <input type="date" id="expiry_date" name="expiration" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="quantity"> Quantity </label><br />
                        <input type="number" id="quantity" defaultValue="1" max="100" min="1" name="quantity" />

                        <select id="unit" name="unit">
                            {units}

                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Notes</label>
                        <textarea name="notes"></textarea>
                    </fieldset>
                    <button type='submit'>
                        Add Item
                    </button>
                    <button type='reset'>
                        Reset
                    </button>
                </form>
            </section>
        )
    }
}
