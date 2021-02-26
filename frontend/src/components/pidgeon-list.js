import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>
        <td>{props.pidgeon.distanceToUser}</td>
        <td>
            <form onSubmit={() => props.func(props.pidgeon._id)}>
                <input type="submit" className="btn btn-primary" value="Übernehme ich!" onClick={() => props.func(props.pidgeon._id)} />
            </form>
        </td>
    </tr>
)

export default class PidgeonList extends Component {

    constructor(props) {
        super(props);
        this.state = { pidgeons: [] };
        { this.getLocation() }

    }

    componentDidMount() {
        var token = this.getFromLocalStorage("token");
        
        axios.get('http://localhost:4000/pidgeons?secret_token=' + token)
            .then(response => {
                console.log(response.data)

                var pidWithDistance = response.data.map(p => { p.distanceToUser = this.distance(p.latitude, p.longitude); return p })
                pidWithDistance = pidWithDistance.sort((a, b) => a.distanceToUser - b.distanceToUser);
                this.setState({ pidgeons: pidWithDistance });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    showPosition = (position) => {

        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    takeCareForPidgeon  = async (pid_id) =>  {
        var token = this.getFromLocalStorage("token");
        const submittedCaretaker = {
            responsible_person_registered:  this.getFromLocalStorage("email")
        }
        axios.post('http://localhost:4000/pidgeons/takecare/' + pid_id +'?secret_token=' + token, submittedCaretaker)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);

        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }


    distance = (lat, lon) => {

        let radlat1 = Math.PI * lat / 180;
        let radlat2 = Math.PI * this.state.latitude / 180;
        let theta = lon - this.state.longitude;
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }

    pidgeonList = (takeCareForPidgeon) => {
        return this.state.pidgeons.map(function (currentPidgeon, i) {
            return <Pidgeon pidgeon={currentPidgeon} key={i} func={takeCareForPidgeon} />;
        })
    }
    getFromLocalStorage(key) {
        var object = JSON.parse(window.localStorage.getItem(key));

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

    render() {
        var token = this.getFromLocalStorage("token");
        return (
            <div>
                {token === ''
                    ? <Redirect to={'/login/'} /> :
                    <div>
                        <h3>Liste</h3>
                        <table className="table table-striped" style={{ marginTop: 20 }} >
                            <thead>
                                <tr>
                                    <th>Beschreibung</th>
                                    <th>Entfernung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.pidgeonList(this.takeCareForPidgeon)}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}