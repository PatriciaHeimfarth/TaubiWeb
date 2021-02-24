import React, { Component } from 'react';
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
            .then(res => console.log(res.data));

        this.setState({
            password: '',
            email: ''
        })
    }

    render() {
        return (
            <div>
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


                </form>
            </div>
        )
    }

}