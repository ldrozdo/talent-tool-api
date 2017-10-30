import React from 'react';
import {connect} from 'react-redux';
import * as languageActions from '../../actions/languageActions';
import PropTypes from 'prop-types';
import { Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import LanguageForm from './LanguageForm';
import { withRouter } from 'react-router-dom';

class LanguagePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      language: this.props.language,
      saving: false,
      isEditing: false};

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateLanguageState = this.updateLanguageState.bind(this);
    this.saveLanguage = this.saveLanguage.bind(this);
    this.deleteLanguage = this.deleteLanguage.bind(this);
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language.id != nextProps.language.id) {
      this.setState({language: nextProps.language});
    }

     this.setState({saving: false, isEditing: false});
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
    this.onUpdate();
    this.props.actions.updateLanguage(this.state.language);
  }

  onUpdate(){
    this.props.onLanguageUpdated(this.state.language);
  }

  deleteLanguage(event) {
    this.props.onLanguageDeleted();
    this.props.actions.deleteLanguage(this.state.language);
  }


  render() {
    if (this.state.isEditing) {
      return (
      <div>
      <h1>Edit language</h1>
          <LanguageForm
          language={this.state.language}
          onSave={this.saveLanguage}
          onChange={this.updateLanguageState}
          saving={this.state.saving} />
      </div>
      )
    }
    return(
      <div>
        <h1>{this.state.language.name}</h1>
        <Button onClick={this.toggleEdit}>Edit</Button>
        <Button onClick={this.deleteLanguage}>Delete</Button>
      </div>
    )
  }

}

LanguagePage.propTypes = {
  language: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let language = {name: ''};
  if (ownProps.language) {
    const id = ownProps.language.id;
    if (state.languages.length > 0) {
      language = Object.assign({}, state.languages.find(language => language.id == id))
    }
  }
    return {language: language};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(languageActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguagePage));
