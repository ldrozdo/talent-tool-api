import React from 'react';
import PropTypes from 'prop-types';
import LanguageItem from './LanguageItem';
import {  Nav } from 'react-bootstrap';

class LanguageList extends React.Component {
  constructor(props) {
		super(props);

    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.handleSearch(e.target.value);
	}

  render() {
    var searchText = this.props.searchText;
    var languages = this.props.languages.map((language, index) => {
      if(language.name != '' && language.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
        return <LanguageItem
          key={language.id}
          language={language}
          index={index}
          onLanguageClicked={this.props.onLanguageClicked}
        />;
      });
        return <Nav bsStyle="tabs" stacked>{languages}</Nav>;
  }

}

LanguageList.propTypes = {
  languages: PropTypes.array.isRequired
};

export default LanguageList;
