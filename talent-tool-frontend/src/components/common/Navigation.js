import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon, Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  NavLink } from 'react-router-dom';
import App from '../../App';
import HomePage from './HomePage';
import Languages from '../languages/Languages';
import LanguagePage from '../languages/LanguagePage';
import NewLanguagePage from '../languages/NewLanguagePage';
import Categories from '../categories/Categories';
import Queries from '../queries/Queries';

class Navigation extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("logout");
    this.props.keycloak.logout();
  }


  render() {
    let username = localStorage.getItem('username');
    let keycloak = this.props.keycloak;
    console.log(keycloak);
    return (
        <Router>
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <p>Talent Acquisition Tool</p>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem className="navigation-menu"><NavLink to="queries">Manage your queries</NavLink></NavItem>
                  <NavItem className="navigation-menu"><NavLink to="categories">Categories</NavLink></NavItem>
                  <NavItem className="navigation-menu"><NavLink to="languages">Languages</NavLink></NavItem>
                  <NavItem className="menu-user" onClick = {this.onClick}><Glyphicon glyph="user"/>{username} LOGOUT</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Route path="/languages" component={Languages} />
            <Route path="/queries" component={Queries} />
            <Route path="/categories" component={Categories} />

          </div>
        </Router>

    );
  }
}

export default Navigation;
