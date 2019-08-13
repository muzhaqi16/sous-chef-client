import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { faClock, faUtensils, faHeart, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from '../../config'
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
    removeIngredient = i => {
        this.setState({
            recipeItems: this.state.recipeItems.filter(item => item !== i)
        })
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
            userInput: "",
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
                userInput: "",
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
        this.setState({
            recipes: []
        })
        const url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
        const ingredients = this.state.recipeItems.join();
        fetch(`${url}${ingredients}&apiKey=${config.RECIPE_API_KEY}`)
            .then(response => response.json())
            .then(data => this.handleRecipes(data))
            .catch(error => {
                console.error(error.message + '. Could not get recipes')
            })
    }
    getRecipeInformation(id) {
        const url = `https://api.spoonacular.com/recipes/${id}/information`;
        return fetch(`${url}?apiKey=${config.RECIPE_API_KEY}`)
            .then(response => response.json())
            .then(data => this.handleInformation(data))
            .catch(error => {
                console.error(error.message + '. Could not get recipes')
            })
    }
    handleInformation = (data) => {
        const cookingMinutes = data.cookingMinutes;
        const sourceUrl = data.sourceUrl
        const preparationMinutes = data.preparationMinutes;
        const readyInMinutes = data.readyInMinutes;
        const servings = data.servings;
        const id = data.id;
        const info = { cookingMinutes, preparationMinutes, readyInMinutes, servings, id, sourceUrl };
        return info;
    }
    handleRecipes = (data) => {
        let fetchArray = data.map(item =>
            this.getRecipeInformation(item.id));

        Promise.all(fetchArray).then(recipes => {
            recipes.map((info, i) => {
                const { id, image, likes, title, missedIngredients } = data[i];
                const { cookingMinutes, preparationMinutes, readyInMinutes, servings, sourceUrl } = info;
                const missingIngredientsString = missedIngredients.map((ingredient, i) => {
                    if (ingredient) {
                        if (i === 0)
                            return ingredient.name
                        return ', ' + ingredient.name
                    }
                    return ""
                });
                const newRecipe = { title, image, missingIngredientsString, id, likes, cookingMinutes, preparationMinutes, readyInMinutes, servings, sourceUrl };

                this.setState({
                    recipes: [...this.state.recipes, newRecipe],
                    userInput: ""
                });
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
            return <li key={item}>{item}<button onClick={() => this.removeIngredient(item)}><FontAwesomeIcon icon={faTimesCircle} /></button></li>
        })
        const recipesList = recipes.map(recipe => {
            return <li key={recipe.id}>
                <div className="header">
                    <img src={recipe.image} alt={recipe.title} />
                    <h1>{recipe.title}</h1>
                </div>
                <div className="recipe-info">
                    <span className="servings"><FontAwesomeIcon icon={faUtensils} /> {recipe.servings} people</span>
                    <span className="likes"><FontAwesomeIcon icon={faHeart} /> {recipe.likes} </span>
                    <span className="ready-in-time"><FontAwesomeIcon icon={faClock} /> {recipe.readyInMinutes} minutes </span>
                </div>
                <p>Missing ingredients - {recipe.missingIngredientsString.length === 0 ? 'none' : recipe.missingIngredientsString}</p>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="view-recipe-button">View Recipe</a>
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
                </ul>

            </Fragment>
        );
    }
}

