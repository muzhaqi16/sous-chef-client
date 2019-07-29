import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import LandingPage from './routes/LadingPage/LandingPage'
import GroceriesPage from './routes/GroceriesPage/GroceriesPage'
import Footer from './components/Footer/Footer'
import LoginPage from './routes/LoginPage/LoginPage'
import RegistrationPage from './routes/RegistrationPage/RegistrationPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import GroceriesContext from './contexts/GroceriesContext';
import './App.css';
import groceriesData from './groceriesData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      hasError: false
    };
  }
  addGroceries = groceries => {
    this.setState({
      groceries: [...this.state.groceries, groceries],
    })
  }
  deleteGroceries = groceryId => {
    this.setState({
      groceries: this.state.groceries.filter(grocery => grocery.id !== groceryId)
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
      deleteGroceries: this.deleteGroceries
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
                path={'/groceries/'}
                component={GroceriesPage}
              />
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
