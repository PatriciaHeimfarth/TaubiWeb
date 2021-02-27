import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class CreatePidgeon extends Component {



    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTown = this.onChangeTown.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeResponsiblePersonRegistered = this.onChangeResponsiblePersonRegistered.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            town: '',
            latitude: '',
            longitude: '',
            email: ''

        }
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

            return token;
        }
        else {
            return '';
        }


    }

    showPosition = (position) => {
        alert("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);

        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeTown(e) {
        this.setState({
            town: e.target.value
        });
    }
    onChangeLatitude(e) {
        this.setState({
            latitude: e.target.value
        });
    }
    onChangeLongitude(e) {
        this.setState({
            longitude: e.target.value
        });
    }
    onChangeResponsiblePersonRegistered(e) {
        this.setState({
            responsiblePersonRegistered: ''
        });
    }
    onChangeEmail(e) {
        this.setState(
            {
                email: e.target.value
            }
        )
    }



    onSubmit(e) {
        e.preventDefault();
        console.log(`Todo Description: ${this.state.description}`);
        const submittedPidgeon = {
            description: this.state.description,
            town: this.state.town,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            responsible_person_registered: '',
            email: this.state.email
        };
        var token = this.getFromLocalStorage("token");
        axios.post('http://localhost:4000/pidgeons/add?secret_token=' + token , submittedPidgeon)
            .then(res => console.log(res.data));

        this.setState({
            description: '',
            town: '',
            latitude: '',
            longitude: '',
            email: ''
        })
    }

    render() {
        var token = this.getFromLocalStorage();
        return (
            <div>
                {token === ''
                    ? <Redirect to={'/login/'} /> :
                    <div style={{ marginTop: 10 }}>
                        <h3>Neue Taube hinzufügen</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Beschreibung: </label>
                                <textarea
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>Stadt: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.town}
                                    onChange={this.onChangeTown}
                                />
                            </div>
                            <div className="form-group">
                                <label>Latitude: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.latitude}
                                    onChange={this.onChangeLatitude}
                                />
                            </div>
                            <div className="form-group">
                                <label>Longitude: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={this.state.longitude}
                                    onChange={this.onChangeLongitude}
                                />
                            </div>
                            <div className="form-group">
                                <label>Kontakt E-Mail: </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Taube hinzufügen" className="btn btn-primary" />
                            </div>
                        </form>
                        <button className="btn btn-dark" onClick={this.getLocation}>Aktueller Standort</button>
                    </div>
                }
            </div>
        )
    }
}