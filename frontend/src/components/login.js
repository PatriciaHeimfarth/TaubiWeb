import React, { Component } from 'react';

export default class Login extends Component {


    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
      
        this.state = {
            password: '',
            email: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            email: e.target.value
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
                            type="text"
                            className="form-control"

                        />
                    </div>
                    <div className="form-group">
                        <label>Passwort</label>
                        <input
                            type="text"
                            className="form-control"

                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>


                </form>
            </div>
        )
    }

}