import React from 'react';
import PropTypes from 'prop-types';
import * as categoryActions from '../../actions/categoryActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EditTranslationPage from './EditTranslationPage';

class TranslationList extends React.Component {

  constructor(props) {
    super(props);

    this.findLanguageForTranslation = this.findLanguageForTranslation.bind(this);
  }


  findLanguageForTranslation(translation){
    let selected = this.props.languages.map(language => {
      if (language.id == translation.language_id) {
        return language;
      }
    })
    let language = selected.filter(el => el != undefined)[0];
    return language
  };

  render() {
    var translations = this.props.translations.map(translation => {
      if(this.findLanguageForTranslation(translation))
        return <li key={translation.id}><b>{this.findLanguageForTranslation(translation).name}: </b>
        {translation.translated_query}
        {this.props.isAdmin &&
          <EditTranslationPage translation = {translation}/>
        }
        </li>;
      });
        return <div>
                  <h3>Translations</h3>
                  <ul>{translations}</ul>
               </div>;
  }
}

TranslationList.propTypes = {
  translations: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default withRouter(connect(mapDispatchToProps)(TranslationList));
