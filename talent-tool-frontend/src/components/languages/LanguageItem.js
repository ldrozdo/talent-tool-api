import React, { Component } from 'react';
import {  NavItem } from 'react-bootstrap';

class LanguageItem extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onLanguageClicked, index } = this.props

    onLanguageClicked(index);
  }

  render() {
    const { language } = this.props;

    if (language.name) {
      return (
        <NavItem onClick={this.onClick}>
          <b>{language.name}</b>
        </NavItem>
      );
    }
    return ( null )
  }
}

export default LanguageItem;
