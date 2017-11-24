import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import {  Nav } from 'react-bootstrap';

class CategoryList extends React.Component {

  constructor(props) {
		super(props);

    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.handleSearch(e.target.value);
	}

  render() {
    var searchText = this.props.searchText;
    var categories = this.props.categories.map((category, index) => {
      if(category.name != '' && category.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
        return <CategoryItem
          key={category.id}
          category={category}
          index={index}
          onCategoryClicked={this.props.onCategoryClicked}
        />;
      });
        return <Nav bsStyle="tabs" stacked>{categories}</Nav>;
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryList;
