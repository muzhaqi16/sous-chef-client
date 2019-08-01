import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './GroceriesListPage.css';

export default class GroceriesListPage extends Component {
    static contextType = GroceriesContext;

    handleDelete = ev => {
        const id = this.props.groceryItem.id;
        this.context.deleteGroceries(id);
    }
    handleAdd = ev => {
        const id = this.props.groceryItem.id;
        this.context.addShoppingListItem(this.context.data.groceries[id - 1]);
    }
    render() {
        return (
            <li className="grocery-item">
                <img src={require('./../../img/' + this.props.groceryItem.image + '.png')} alt={this.props.groceryItem.name} />
                <div className="item-info">
                    <h3>{this.props.groceryItem.name}</h3>
                    <p>{this.props.groceryItem.quantity} {this.props.groceryItem.unit}</p>
                </div>

                <label className="expiration">Expires in {this.props.groceryItem.expires}</label>

                <FontAwesomeIcon className="delete" icon={faMinus} onClick={this.handleDelete} title="Delete this item from your list" />
                <label className="add" title="Add to shopping list" onClick={this.handleAdd} ><FontAwesomeIcon icon={faPlus} /> Add to List</label>
            </li>
        )
    }
}
