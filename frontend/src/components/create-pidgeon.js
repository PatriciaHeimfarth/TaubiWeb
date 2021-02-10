import React, { Component } from 'react';

export default class CreatePidgeon extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTown = this.onChangeTown.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeResponsiblePersonRegistered = this.onChangeResponsiblePersonRegistered.bind(this);


        this.state = {
            description: '',
            town: '',
            latitude: '',
            longitude: '',
            responsiblePersonRegistered: false

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



    onSubmit(e) {
        e.preventDefault();


        this.setState({
            description: '',
            town: '',
            latitude: '',
            longitude: '',
            responsiblePersonRegistered: false
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
                        <input type="submit" value="Taube hinzufügen" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}