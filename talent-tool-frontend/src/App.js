import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/common/Navigation';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navigation />

      </div>
    );
  }
}


export default App;
