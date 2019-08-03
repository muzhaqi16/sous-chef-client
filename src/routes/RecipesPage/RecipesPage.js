import React, { Component } from 'react'
import RecipeSearchBox from '../../components/RecipeSearchBox/RecipeSearchBox'
import GroceriesContext from './../../contexts/GroceriesContext';
import './RecipesPage.css';

export default class RecipesPage extends Component {
    static contextType = GroceriesContext;
    render() {
        const itemNames = this.context.data.groceries;
        let grocerySuggestions = itemNames.map(obj => obj['name'])
        return (
            <section id="recipe-page">
                <RecipeSearchBox suggestions={grocerySuggestions} />
            </section>
        )
    }
}
