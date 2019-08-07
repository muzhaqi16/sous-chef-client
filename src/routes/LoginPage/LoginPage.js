import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'

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

        history.push(destination)
    }

    render() {
        return (
            <section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </section>
        )
    }
}
