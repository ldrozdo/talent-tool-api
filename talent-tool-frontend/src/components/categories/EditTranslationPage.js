import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import * as categoryActions from '../../actions/categoryActions';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import TranslationForm from './TranslationForm';
import { Button} from 'react-bootstrap';

class EditTranslationPage extends React.Component {
  constructor(props) {
    super(props);

    super(props);
    this.state = {
      translation: this.props.translation
    };

    this.updateTranslationState = this.updateTranslationState.bind(this);
    this.updateTranslation = this.updateTranslation.bind(this);
    this.deleteTranslation = this.deleteTranslation.bind(this);
  }

  updateTranslationState(event) {
    const field = event.target.name;
    const translation = this.state.translation;
    translation[field] = event.target.value;
    return this.setState({translation: translation});
  }

  updateTranslation(event) {
    event.preventDefault();
    this.props.actions.updateTranslation(this.state.translation);
  }

  deleteTranslation(event) {
    event.preventDefault();
    this.props.actions.deleteTranslation(this.state.translation);
  }


  render() {
    return (
      <div>
      <TranslationForm
        translation={this.state.translation}
        onSave={this.updateTranslation}
        onChange={this.updateTranslationState} />
        <Button onClick={this.deleteTranslation}>Delete</Button>
        <hr />
      </div>

  );
  }
}

EditTranslationPage.propTypes = {
  translation: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  let translation = ownProps.translation;
  return {translation: translation};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTranslationPage));
