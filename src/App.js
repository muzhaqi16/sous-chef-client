import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import LandingPage from './routes/LadingPage/LandingPage'
import GroceriesPage from './routes/GroceriesPage/GroceriesPage'
import RecipesPage from './routes/RecipesPage/RecipesPage';
import AddGroceriesPage from './routes/AddGroceriesPage/AddGroceriesPage';
import Footer from './components/Footer/Footer'
import LoginPage from './routes/LoginPage/LoginPage'
import RegistrationPage from './routes/RegistrationPage/RegistrationPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import GroceriesContext from './contexts/GroceriesContext';
import './App.css';
import groceriesData from './groceriesData'
import ShoppingListPage from './routes/ShoppingListPage/ShoppingListPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      shoppingList: [{
        "id": "1",
        "name": "Apples",
        "quantity": 2,
        "unit": "pounds"
      }, {
        "id": "2",
        "name": "Oranges",
        "image": "orange"
      },
      {
        "id": "3",
        "name": "Ice Cream",
        "quantity": 1,
        "unit": "container"
      },],
      hasError: false
    };
  }
  addGroceries = groceryItem => {
    this.setState({
      groceries: [...this.state.groceries, groceryItem],
    })
  }
  addShoppingListItem = item => {
    this.setState({
      shoppingList: [...this.state.shoppingList, item],
    })
  }
  removeShoppingListItem = item => {
    this.setState({
      shoppingList: this.state.shoppingList.filter(listItem => listItem.name !== item),
    })
  }
  deleteGroceries = groceryItemId => {
    this.setState({
      groceries: this.state.groceries.filter(grocery => grocery.id !== groceryItemId)
    })
  }
  componentDidMount() {
    this.setState({ groceries: groceriesData });
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const contextValue = {
      data: this.state,
      addGroceries: this.addGroceries,
      deleteGroceries: this.deleteGroceries,
      addShoppingListItem: this.addShoppingListItem,
      removeShoppingListItem: this.removeShoppingListItem,
    }
    return (
      <div className='App'>
        <GroceriesContext.Provider value={contextValue}>
          <header className='App__header'>
            <Header />
          </header>
          <main className='App__main'>

            {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
            <Switch>
              <Route
                exact
                path={'/'}
                component={LandingPage}
              />
              <Route
                path={'/login'}
                component={LoginPage}
              />
              <Route
                path={'/register'}
                component={RegistrationPage}
              />
              <Route
                path={'/groceries/:path'}
                component={GroceriesPage}
              />
              <Route path={'/recipes'}
                component={RecipesPage} />
              <Route
                path={'/add_groceries'}
                component={AddGroceriesPage}
              />
              <Route path={'/shopping_list'}
                component={ShoppingListPage} />
              <Route
                component={NotFoundPage}
              />
            </Switch>

          </main>
          <Footer />
        </GroceriesContext.Provider>
      </div >
    )
  }
}
export default App;
