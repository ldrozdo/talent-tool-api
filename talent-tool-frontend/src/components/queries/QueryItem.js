import React, { Component } from 'react';
import {  NavItem } from 'react-bootstrap';

class QueryItem extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onQueryClicked, index } = this.props

    onQueryClicked(index);
  }

  render() {
    const { query } = this.props;

    if (query.name) {
      return (
        <NavItem onClick={this.onClick}>
          <b>{query.name}</b>
        </NavItem>
      );
    }
    return ( null )
  }
}

export default QueryItem;
