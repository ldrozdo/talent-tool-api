import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as languageActions from '../../actions/languageActions';
import LanguageForm from './LanguageForm';
import { withRouter } from 'react-router-dom';
import {Col} from 'react-bootstrap';



class NewLanguagePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: {
        name: ''
      },
      saving: false,
      authToken: this.props.authToken
    };

    this.saveLanguage = this.saveLanguage.bind(this);
    this.updateLanguageState = this.updateLanguageState.bind(this);
  }

  updateLanguageState(event) {
    const field = event.target.name;
    const language = this.state.language;
    language[field] = event.target.value;
    return this.setState({language: language});
  }

  saveLanguage(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.createLanguage(this.state.language, this.state.authToken)
      .then(({ message }) => {
        this.props.handleCreating(message)
      });
    // this.props.actions.createLanguage(this.state.language)
  }

  render() {
    return (
      <div>
        <h1>New Language</h1>
        <LanguageForm
        language={this.state.language}
        onSave={this.saveLanguage}
        onChange={this.updateLanguageState}
        saving={this.state.saving} />
      </div>
    );
  }
}

NewLanguagePage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let language = {name: ''};
  let authToken = localStorage.getItem('token');
  return {language: language, authToken: authToken };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(languageActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewLanguagePage));
