import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {getFromLocalStorage} from '../helpers.js';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            password: '',
            email: ''
        }

        this.getFromLocalStorage = getFromLocalStorage.bind(this)
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const submittedUser = {
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:4000/login', submittedUser)
            .then(res => {

                this.storeInLocalStorage("token", res.data.token);
                this.storeInLocalStorage("email", submittedUser.email);
                window.location.reload();
            });

        this.setState({
            password: '',
            email: ''
        })
    }

    storeInLocalStorage(key, stringToStore) {
        var object = { value: stringToStore, timestamp: new Date().getTime() + 12 * 60 * 60 * 1000 }
        localStorage.setItem(key, JSON.stringify(object));
    }

   
    render() {
        var token = this.getFromLocalStorage("token");
        return (
            <div>
                {token !== ''
                    ? <Redirect to={'/list/'} /> :
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>E-Mail</label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Passwort</label>
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary" />
                        </div>


                    </form>}
            </div>
        )
    }

}