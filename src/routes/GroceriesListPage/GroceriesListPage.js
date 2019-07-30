import React, { Component } from 'react'
import GroceriesContext from './../../contexts/GroceriesContext';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class GroceriesListPage extends Component {
    static contextType = GroceriesContext;

    handleClick = ev => {
        const id = this.props.groceryItem.id;
        this.context.deleteGroceries(id);
    }
    render() {
        return (
            <li>{this.props.groceryItem.name} Expires in {this.props.groceryItem.expires} {this.props.groceryItem.quantity} {this.props.groceryItem.unit}<FontAwesomeIcon icon={faMinus} onClick={this.handleClick} /></li>
        )
    }
}
