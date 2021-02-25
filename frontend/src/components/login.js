import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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

                this.storeInLocalStorage(res.data.token);
            });

        this.setState({
            password: '',
            email: ''
        })
    }

    storeInLocalStorage(stringToStore) {
        var object = { value: stringToStore, timestamp: new Date().getTime() + 12 * 60 * 60 * 1000 }
        localStorage.setItem("token", JSON.stringify(object));
    }

    getFromLocalStorage() {
        var object = JSON.parse(window.localStorage.getItem("token"));

        if (object !== null) {
            var dateString = object.timestamp;
            var now = new Date().getTime();

            if (dateString > now) {
                var token = object.value;
            }
            else {
                var token = '';
            }
            //alert(token);
            return token;
        }
        else {
            return '';
        }


    }

    render() {
        var token = this.getFromLocalStorage();





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
                                type="text"
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