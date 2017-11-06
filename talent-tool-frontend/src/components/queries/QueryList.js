import React from 'react';
import PropTypes from 'prop-types';
import QueryItem from './QueryItem';
import {  Nav } from 'react-bootstrap';

const QueryList = ({queries, onQueryClicked}) => {
  return (
    <Nav bsStyle="tabs" stacked>
    {queries.map((query, index) =>
      <QueryItem
        key={query.id}
        query={query}
        index={index}
        onQueryClicked={onQueryClicked}
      />
      )}
      </Nav>
  );
};

QueryList.propTypes = {
  queries: PropTypes.array.isRequired
};

export default QueryList;
