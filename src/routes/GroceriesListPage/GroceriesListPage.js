import React, { Component } from 'react'

export default class GroceriesListPage extends Component {
    render() {
        return (
            <li>{this.props.groceryItem.id} {this.props.groceryItem.name} {this.props.groceryItem.category}</li>
        )
    }
}
