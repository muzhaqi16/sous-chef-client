import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../config'
import TokenService from '../../services/token-service'
import GroceriesContext from './../../contexts/GroceriesContext';
import GroceryItem from '../GroceriesItem/GroceriesItem'
import './GroceriesPage.css';

export default class GroceriesPage extends Component {
    static contextType = GroceriesContext;
    componentDidMount() {
        fetch(config.API_ENDPOINT + '/groceries', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(this.context.setGroceries)
            .catch(error => {
                console.error(error)
                this.setState({ hasError: error })
            })
    }
    render() {
        const { groceries = [] } = this.context.data;
        const filter = this.props.match.params.path;
        const groceryList = groceries.map(items => {
            if (filter === "all" || items.location === filter) {
                return <GroceryItem groceryItem={items} key={items.id} />
            }
            return false;
        }
        )
        return (
            <div className="GroceriesPage">
                <div className="options">
                    <Link to="/add_groceries">Add items <FontAwesomeIcon icon={faPlus} /></Link>
                    <Link to="all">All</Link>
                    <Link to="freezer">Freezer</Link>
                    <Link to="fridge">Fridge</Link>
                    <Link to="pantry">Pantry</Link>
                </div>
                <section className="GroceryList">
                    <ul>
                        {groceryList}
                    </ul>
                </section>
            </div>
        )
    }
}
