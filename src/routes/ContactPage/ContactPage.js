import React, { Component } from 'react'
import './ContactPage.css'

export default class ContactPage extends Component {

    render() {
        return (
            <section className='ContactPage'>
                <h2>Get in touch</h2>
                <h1>We'd love to hear from you</h1>
                <p>Contact us at <a href="mailto:artanmuzhaqi@gmail.com"> artanmuzhaqi@gmail.com</a></p>
            </section>
        )
    }
}
