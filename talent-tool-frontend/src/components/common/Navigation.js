import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
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

  render() {
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
