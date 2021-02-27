import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const Pidgeon = props => (
    <tr>
        <td>{props.pidgeon.description}</td>

    </tr>)

class MyPidgeons extends Component {

    constructor(props) {
        super(props);
        this.state = { pidgeons: [] };

    }
    componentDidMount() {
        var token = this.getFromLocalStorage("token");

        axios.get('http://localhost:4000/pidgeons?secret_token=' + token)
            .then(response => {
                console.log(response.data)
                this.setState({ pidgeons: response.data });

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