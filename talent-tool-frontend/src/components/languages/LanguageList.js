import React from 'react';
import PropTypes from 'prop-types';
import LanguageItem from './LanguageItem';
import {  Nav } from 'react-bootstrap';

const LanguageList = ({languages, onLanguageClicked}) => {
  return (
    <Nav bsStyle="tabs" stacked>
    {languages.map((language, index) =>
      <LanguageItem
        key={language.id}
        language={language}
        index={index}
        onLanguageClicked={onLanguageClicked}
      />
      )}
      </Nav>
  );
};

LanguageList.propTypes = {
  languages: PropTypes.array.isRequired
};

export default LanguageList;
