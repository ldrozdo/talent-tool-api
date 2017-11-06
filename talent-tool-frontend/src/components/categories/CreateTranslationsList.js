import React from 'react';
import PropTypes from 'prop-types';
import NewTranslationPage from './NewTranslationPage';


class CreateTranslationsList extends React.Component {

  constructor(props) {
    super(props);

    // this.findLanguageForTranslation = this.findLanguageForTranslation.bind(this);
  }


  // findLanguageForTranslation(translation){
  //   let selected = this.props.languages.map(language => {
  //     if (language.id == translation.language_id) {
  //       return language;
  //     }
  //   })
  //   let language = selected.filter(el => el != undefined)[0];
  //   return language
  // };

  render() {
    return (
      <div>
        <h3>Add a translation for: </h3>
        <ul>
          {this.props.languages.map(language =>
              <li key={language.id}><b>{language.name}</b> <NewTranslationPage category = {this.props.category} language = {language}/> </li>
            )}
        </ul>
      </div>
    );
  }

}

CreateTranslationsList.propTypes = {
  languages: PropTypes.array.isRequired
};

export default CreateTranslationsList;
