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
        const apiKey = '405190d9b2554465948e538161346bba';
        const ingredients = this.state.recipeItems.join();
        fetch(`${url}${ingredients}&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => this.handleRecipes(data))
            .catch(error => {
                console.error(error.message + '. Could not get recipes')
            })
    }
    handleRecipes = (data) => {
        const newRecipes = data.map(item => {
            const id = item.id;
            const likes = item.likes;
            const title = item.title;
            const image = item.image;
            const missingIngredients = item.missedIngredients.map(ingredient => ingredient.name)
            const newRecipe = { title, image, missingIngredients, id, likes };
            return newRecipe;
        })
        this.setState({ recipes: newRecipes });
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
            return <li key={recipe.id}><img src={recipe.image} alt={recipe.title} />{recipe.missingIngredients}</li>
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
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput} placeholder="Start typing..."
                />
                {suggestionsListComponent}
                <div className="selected-ingredients">
                    <ul>
                        {recipeList}
                    </ul>
                </div>
                <ul className="recipes-list">
                    {recipesList}
                </ul>
                <button onClick={getRecipes}>Get Recipes</button>
            </Fragment>
        );
    }
}

