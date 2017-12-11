import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import * as categoryActions from '../../actions/categoryActions';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class NewTranslationPage extends React.Component {
  constructor(props) {
    super(props);

    super(props);
    this.state = {
      translation: {
        category_id: this.props.category.id,
        language_id: this.props.language.id,
        translated_query: ''
      },
      language: this.props.language,
      authToken: this.props.authToken
    };

    this.updateTranslationState = this.updateTranslationState.bind(this);
    this.saveTranslation = this.saveTranslation.bind(this);
  }

  updateTranslationState(event) {
    const field = event.target.name;
    const translation = this.state.translation;
    translation[field] = event.target.value;
    translation['category_id'] = this.props.category.id;
    console.log(this.props.category.id);
    console.log(translation);
    return this.setState({translation: translation});
  }

  saveTranslation(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.createTranslation(this.state.translation, this.state.authToken);
  }


  render() {
    return (
      <div>
        <form>
          <TextInput
            name="translated_query"
            onChange={this.updateTranslationState} />

            <input
             type="submit"
             className="btn btn-primary"
             onClick={this.saveTranslation}
             value = 'Create Translation'/>
        </form>
        <hr />
      </div>
  );
  }
}

NewTranslationPage.propTypes = {
  translation: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let authToken = localStorage.getItem('token');
  let translation = {translated_query: ''};
  return {translation: translation, authToken: authToken};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTranslationPage));
