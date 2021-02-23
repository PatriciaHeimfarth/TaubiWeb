import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import CreatePidgeon from "./components/create-pidgeon";
import PidgeonList from "./components/pidgeon-list";
import Login from "./components/login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link to="/" className="navbar-brand">TaubiWeb</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">Tauben</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Taube hinzufügen</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />

          <Switch>
            <Route path="/list" component={PidgeonList} />
            <Route path="/create" component={CreatePidgeon} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;