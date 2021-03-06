import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";


import CreatePidgeon from "./components/create-pidgeon";
import PidgeonList from "./components/pidgeon-list";
import Login from "./components/login";
import MyPidgeons from "./components/my-pidgeons";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Taubi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Tauben</Nav.Link>
                <Nav.Link href="/create">Taube hinzufügen</Nav.Link>
                <Nav.Link href="/list">Meine Tauben</Nav.Link>                 
              </Nav> 
            </Navbar.Collapse>
          </Navbar>
          <br />
          <Switch>
            <Route path="/list" component={PidgeonList} />
            <Route path="/create" component={CreatePidgeon} />
            <Route path="/my-pidgeons" component={MyPidgeons} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;