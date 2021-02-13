import React, { Component } from 'react';
import axios from 'axios';

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
            responsiblePersonRegistered: false,
            email: ''

        }
    }

    showPosition(position) {
        alert("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
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
            responsiblePersonRegistered: e.target.value
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
            responsiblePersonRegistered: this.state.responsiblePersonRegistered,
            email: this.state.email
        };

        axios.post('http://localhost:4000/pidgeons/add', submittedPidgeon)
            .then(res => console.log(res.data));

        this.setState({
            description: '',
            town: '',
            latitude: '',
            longitude: '',
            responsiblePersonRegistered: false,
            email: ''
        })
    }

    render() {
        return (
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
        )
    }
}