import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

 
import CreatePidgeon from "./components/create-pidgeon";
import PidgeonList from "./components/pidgeon-list";

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
          <br/>
          <Route path="/list" component={PidgeonList} />
          <Route path="/create" component={CreatePidgeon} />
        </div>
      </Router>
    );
  }
}

export default App;