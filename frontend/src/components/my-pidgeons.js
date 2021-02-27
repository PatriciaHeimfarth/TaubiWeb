import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {getFromLocalStorage} from '../helpers.js';

const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>

    </tr>)

class MyPidgeons extends Component {

    constructor(props) {
        super(props);
        this.state = { pidgeons: [] };
        this.getFromLocalStorage = getFromLocalStorage.bind(this)


    }
    componentDidMount() {
        var token = this.getFromLocalStorage("token");
        var email = this.getFromLocalStorage("email");
        axios.get('http://localhost:4000/pidgeons?secret_token=' + token)
            .then(response => {
                console.log(response.data)

                var onlyPidgeonsWhichBelongToUser = response.data.filter(
                    p => p.responsible_person_registered === email
                )

                this.setState({ pidgeons: onlyPidgeonsWhichBelongToUser });

            })
            .catch(function (error) {
                console.log(error);
            })
    }


    pidgeonList = () => {
        return this.state.pidgeons.map(function (currentPidgeon, i) {
            return <Pidgeon pidgeon={currentPidgeon} key={i} />;
        })
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

                                </tr>
                            </thead>
                            <tbody>
                                {this.pidgeonList()}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}
export default MyPidgeons;