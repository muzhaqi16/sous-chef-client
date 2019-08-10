import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import LandingPage from './routes/LadingPage/LandingPage'
import GroceriesPage from './routes/GroceriesPage/GroceriesPage'
import RecipesPage from './routes/RecipesPage/RecipesPage';
import AddGroceriesPage from './routes/AddGroceriesPage/AddGroceriesPage';
import Footer from './components/Footer/Footer'
import LoginPage from './routes/LoginPage/LoginPage'
import ContactPage from './routes/ContactPage/ContactPage'
import RegistrationPage from './routes/RegistrationPage/RegistrationPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import GroceriesContext from './contexts/GroceriesContext';
import './App.css';
import ShoppingListPage from './routes/ShoppingListPage/ShoppingListPage';
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'

class App extends Component {
  state = {
    groceries: [],
    shoppingList: [],
    hasError: false
  };

  setGroceries = groceries => {
    this.setState({
      groceries,
    })
  }
  addGrocery = groceryItem => {
    this.setState({
      groceries: [...this.state.groceries, groceryItem],
    })
  }
  deleteGrocery = groceryItemId => {
    this.setState({
      groceries: this.state.groceries.filter(grocery => grocery.id !== groceryItemId)
    })
  }
  checkIfItemExists = newItem => {
    return this.state.shoppingList.find(item => item.name === newItem.name)
  }
  addShoppingListItem = item => {
    if (!this.checkIfItemExists(item)) {
      this.setState({
        shoppingList: [...this.state.shoppingList, item],
      })
      return true
    }
    return false
  }
  removeShoppingListItem = item => {
    this.setState({
      shoppingList: this.state.shoppingList.filter(listItem => listItem.name !== item),
    })
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const contextValue = {
      data: this.state,
      setGroceries: this.setGroceries,
      addGrocery: this.addGrocery,
      deleteGrocery: this.deleteGrocery,
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
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <Route
                path={'/contact'}
                component={ContactPage}
              />
              <PrivateRoute
                path={'/groceries/:path'}
                component={GroceriesPage}
              />
              <PrivateRoute path={'/recipes'}
                component={RecipesPage} />
              <PrivateRoute
                path={'/add_groceries'}
                component={AddGroceriesPage}
              />
              <PrivateRoute path={'/shopping_list'}
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
