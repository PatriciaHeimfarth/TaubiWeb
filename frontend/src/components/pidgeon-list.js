import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>
        <td>{props.func(props.pidgeon.latitude,
            props.pidgeon.longitude, props.pidgeon.latitude,
            props.pidgeon.longitude)}</td>
        <td>
            <Link to={"/edit/" + props.pidgeon._id}>Edit</Link>
        </td>
    </tr>
)

export default class PidgeonList extends Component {

    constructor(props) {
        super(props);
        this.state = { pidgeons: [] };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/pidgeons/')
            .then(response => {
                this.setState({ pidgeons: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    distance(lat1, lon1, lat2, lon2) {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }

    pidgeonList(distance) {
        return this.state.pidgeons.map(function (currentPidgeon, i) {
            return <Pidgeon pidgeon={currentPidgeon} key={i} func={distance} />;
        })
    }

 
    render() {
        return (
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
                        {this.pidgeonList(this.distance)}
                    </tbody>
                </table>
            </div>
        )
    }
}