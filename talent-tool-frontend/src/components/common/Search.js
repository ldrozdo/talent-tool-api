import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
		super(props);

    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.handleSearch(e.target.value);
	}

  render() {
    return (
      <div>
        <input type="text" placeholder="Search" value={this.props.searchText} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Search;
