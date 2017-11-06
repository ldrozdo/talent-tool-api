import React, { Component } from 'react';
import {  NavItem } from 'react-bootstrap';

class CategoryItem extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onCategoryClicked, index } = this.props

    onCategoryClicked(index);
  }

  render() {
    const { category } = this.props;

    if (category.name) {
      return (
        <NavItem onClick={this.onClick}>
          <b>{category.name}</b>
        </NavItem>
      );
    }
    return ( null )
  }
}

export default CategoryItem;
