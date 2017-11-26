import React from 'react';
import PropTypes from 'prop-types';
import QueryItem from './QueryItem';
import {  Nav } from 'react-bootstrap';

class QueryList extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleSearch(e.target.value);
  }

  render() {
    var searchText = this.props.searchText;
    var queries = this.props.queries.map((query, index) => {
      if(query.name && query.name != '' && query.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
        return   <QueryItem
            key={query.id}
            query={query}
            index={index}
            onQueryClicked={this.props.onQueryClicked}
          />;
      });
        return <Nav bsStyle="tabs" stacked>{queries}</Nav>;
  }
}

QueryList.propTypes = {
  queries: PropTypes.array.isRequired
};

export default QueryList;
