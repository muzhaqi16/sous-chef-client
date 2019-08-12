import React, { Component } from 'react'
import GroceriesContext from '../../contexts/GroceriesContext';
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../config';
import './GroceriesItem.css';

export default class GroceriesListPage extends Component {
    static contextType = GroceriesContext;
    static defaultProps = {
        addToList: () => { }
    };
    handleDelete = ev => {
        const id = this.props.groceryItem.id;
        fetch(config.API_ENDPOINT + `/groceries/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                this.context.deleteGrocery(id);
            })
            .catch(error => {
                console.error(error)
            })
    }
    render() {

        let current_datetime = new Date(this.props.groceryItem.expiry_date)
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let formatted_date = months[current_datetime.getMonth()] + "-" + (current_datetime.getDate() + 1) + "-" + current_datetime.getFullYear();

        return (
            <li className="grocery-item">

                <img src={'https://spoonacular.com/cdn/ingredients_100x100/' + this.props.groceryItem.image} alt={this.props.groceryItem.name} />
                <div className="item-info">
                    <h3>{this.props.groceryItem.name}</h3>
                    <p>{this.props.groceryItem.quantity} {this.props.groceryItem.unit}</p>
                </div>

                <label className="expiration">Expires in <span>{formatted_date}</span></label>

                <FontAwesomeIcon className="delete" icon={faMinus} onClick={this.handleDelete} title="Delete this item from your list" />
                <label className="add" title="Add to shopping list" onClick={() => this.props.addToList(this.props.groceryItem.name)} ><FontAwesomeIcon icon={faPlus} /> Add to List</label>

            </li>
        )
    }
}
