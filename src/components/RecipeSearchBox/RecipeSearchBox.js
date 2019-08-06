import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import './RecipeSearchBox.css';

export default class RecipeSearchBox extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",

            recipeItems: [],
            recipes: []
        };

    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
            recipeItems: [...this.state.recipeItems, e.currentTarget.innerText]
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion],
                recipeItems: [...this.state.recipeItems, filteredSuggestions[activeSuggestion]]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };
    getRecipes = () => {
        const url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
        const apiKey = '6c127984799b490cbd26a4a7014b83de ';
        const ingredients = this.state.recipeItems.join();
        fetch(`${url}${ingredients}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.handleRecipes(data))
            .catch(error => {
                console.error(error.message + '. Could not get recipes')
            })
    }
    getRecipeInformation(id) {
        const url = `https://api.spoonacular.com/recipes/${id}/information`;
        const apiKey = '6c127984799b490cbd26a4a7014b83de ';
        return fetch(`${url}?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.handleInformation(data))
            .catch(error => {
                console.error(error.message + '. Could not get recipes')
            })
    }
    handleInformation = (data) => {
        const cookingMinutes = data.cookingMinutes;
        const preparationMinutes = data.preparationMinutes;
        const readyInMinutes = data.readyInMinutes;
        const servings = data.servings;
        const id = data.id;
        const info = { cookingMinutes, preparationMinutes, readyInMinutes, servings, id };
        return info;
    }
    handleRecipes = (data) => {
        let fetchArray = data.map(item =>
            this.getRecipeInformation(item.id));

        Promise.all(fetchArray).then(recipes => {
            recipes.map((info, i) => {
                const { id, image, likes, title, missedIngredients } = data[i];
                const { cookingMinutes, preparationMinutes, readyInMinutes, servings } = info;
                const missingIngredientsString = missedIngredients.map(ingredient => ingredient.name + ', ');
                const newRecipe = { title, image, missingIngredientsString, id, likes, cookingMinutes, preparationMinutes, readyInMinutes, servings };

                this.setState({ recipes: [...this.state.recipes, newRecipe] });
                return newRecipe;
            })
        }
        )
    }
    render() {
        const { onChange, onClick, onKeyDown, getRecipes,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput,
                recipeItems,
                recipes
            }
        } = this;
        const recipeList = recipeItems.map(item => {
            return <li key={item}>{item}</li>
        })
        const recipesList = recipes.map(recipe => {
            return <li key={recipe.id}>
                <div className="header">
                    <img src={recipe.image} alt={recipe.title} />
                    <h1>{recipe.title}</h1>
                </div>
                <span className="servings">Servings : {recipe.servings} </span>
                <span className="likes">Likes : {recipe.likes} </span>
                <span className="prep-time">Prep Time : {recipe.preparationMinutes} minutes </span>
                <span className="cooking-time">Cooking Time : {recipe.cookingMinutes} minutes </span>
                <span className="ready-in-time">Ready in {recipe.readyInMinutes} minutes </span>
                <p>Missing ingredients - {recipe.missingIngredientsString.length === 0 ? 'none' : recipe.missingIngredientsString}</p>
            </li>
        })
        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <h1>Which ingredients do you want to use today</h1>
                <div className="search-area">
                    <div className="search-box">
                        <input
                            type="text"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            value={userInput} placeholder="Start typing..."
                        />
                        {suggestionsListComponent}
                    </div>
                    <button id="get-recipes" onClick={getRecipes}>Get Recipes</button>
                </div>



                <div className="selected-ingredients">
                    <ul>
                        {recipeList}
                    </ul>
                </div>
                <ul className="recipes-list">
                    {recipesList}
                    <li>
                        <div className="header">
                            <img src={require('./../../img/undefined.png')} alt="vitamin" />
                            <h1>Vitamin C Booster Smothie</h1>
                        </div>
                        <p>Pre time : 5 minutes</p>
                        <p> Missing :  Carrots</p>
                    </li>
                    <li><img src={require('./../../img/undefined.png')} alt="beet juice" />Wake Up Call: Sweet Beet Juice Missing: Beets</li>
                </ul>

            </Fragment>
        );
    }
}

