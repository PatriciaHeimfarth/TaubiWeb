import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>
        
        <td>
            <Link to={"/edit/"+props.pidgeon._id}>Edit</Link>
        </td>
    </tr>
)

export default class PidgeonList extends Component {

    constructor(props) {
        super(props);
        this.state = {pidgeons: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/pidgeons/')
            .then(response => {
                this.setState({ pidgeons: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    pidgeonList() {
        return this.state.pidgeons.map(function(currentPidgeon, i){
            return <Pidgeon pidgeon={currentPidgeon} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Liste</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        { this.pidgeonList() }
                    </tbody>
                </table>
            </div>
        )
    }
}