import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import './LoginForm.css'

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
            .then(res => {
                user_name.value = ''
                password.value = '';
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label htmlFor='user_name'>
                        User name
          </label>
                    <input
                        required
                        name='user_name'
                        id='user_name'>
                    </input>
                </div>
                <div className='password'>
                    <label htmlFor='password'>
                        Password
          </label>
                    <input
                        required
                        name='password'
                        type='password'
                        id='password'>
                    </input>
                </div>
                <p>Don't have an account ? <Link to='/register'>Register Now</Link></p>
                <button type='submit'>
                    Login
        </button>
            </form>
        )
    }
}
