import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'
export default class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { first_name, last_name, email, user_name, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value
        })
            .then(user => {
                first_name.value = ''
                last_name.value = ''
                user_name.value = ''
                password.value = ''
                email.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='RegistrationForm'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='first_name'>
                    <label htmlFor='first_name'>
                        First name
                    </label>
                    <input
                        name='first_name'
                        type='text'
                        placeholder='John'
                        required
                        id='first_name'>
                    </input>
                </div>
                <div className='last_name'>
                    <label htmlFor='last_name'>
                        Last name
                    </label>
                    <input
                        name='last_name'
                        type='text'
                        placeholder="Doe"
                        required
                        id='last_name'>
                    </input>
                </div>
                <div className='user_name'>
                    <label htmlFor='user_name'>
                        Username
                    </label>
                    <input
                        name='user_name'
                        type='text'
                        placeholder="jdoe"
                        required
                        id='user_name'>
                    </input>
                </div>
                <div className='email'>
                    <label htmlFor='email'>
                        Email Address
                    </label>
                    <input
                        name='email'
                        type='text'
                        placeholder="john@doe.com"
                        required
                        id='email'>
                    </input>
                </div>
                <div className='password'>
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input
                        name='password'
                        type='password'
                        placeholder="password"
                        required
                        id='password'>
                    </input>

                </div>
                <p className="suggestion">* Password must be at least 8 characters long and contain one upper case, lower case, number and special character </p>
                <button type='submit'>
                    Register
        </button>
            </form>
        )
    }
}
