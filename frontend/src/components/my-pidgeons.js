import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {getFromLocalStorage} from '../helpers.js';

const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>
        <td>
            <form onSubmit={() => props.func(props.pidgeon._id)}>
                    <input type="submit" className="btn btn-primary" value="Verantwortung abgeben" onClick={() => props.func(props.pidgeon._id)} />
            </form>
        </td>
        <td>
            <form onSubmit={() => props.rescuedFunc(props.pidgeon._id)}>
                    <input type="submit" className="btn btn-primary" value="Verantwortung abgeben" onClick={() => props.rescuedFunc(props.pidgeon._id)} />
            </form>
        </td>
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

    givePidgeonBack = async (pid_id) => {
        var token = this.getFromLocalStorage("token");
        const submittedCaretaker = {
            responsible_person_registered: ''
        }
        axios.post('http://localhost:4000/pidgeons/takecare/' + pid_id + '?secret_token=' + token, submittedCaretaker)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    
    pidgeonRescued = async (pid_id) => {
        var token = this.getFromLocalStorage("token");
        const submittedCaretaker = {
            responsible_person_registered: ''
        }
        axios.post('http://localhost:4000/pidgeons/delete/' + pid_id + '?secret_token=' + token, submittedCaretaker)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    pidgeonList = (givePidgeonBack) => {
        return this.state.pidgeons.map(function (currentPidgeon, i) {
            return <Pidgeon pidgeon={currentPidgeon} key={i} func={givePidgeonBack} />;
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
                                    <th>Taube zurück in die Übersicht</th>
                                    <th>Taube gerettet?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.pidgeonList(this.givePidgeonBack)}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}
export default MyPidgeons;