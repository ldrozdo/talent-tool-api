import React from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import {  Nav } from 'react-bootstrap';

const CategoryList = ({categories, onCategoryClicked}) => {
  return (
    <Nav bsStyle="tabs" stacked>
    {categories.map((category, index) =>
      <CategoryItem
        key={category.id}
        category={category}
        index={index}
        onCategoryClicked={onCategoryClicked}
      />
      )}
      </Nav>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoryList;
