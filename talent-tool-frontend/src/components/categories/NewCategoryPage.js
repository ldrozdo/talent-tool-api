import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';
import { withRouter } from 'react-router-dom';
import {Col} from 'react-bootstrap';



class NewCategoryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: '',
        category_query: ''
      },
      saving: false,
      authToken: this.props.authToken
    };

    this.saveCategory = this.saveCategory.bind(this);
    this.updateCategoryState = this.updateCategoryState.bind(this);
  }

  updateCategoryState(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({category: category});
  }

  saveCategory(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.createCategory(this.state.category, this.state.authToken)
      .then(({ message }) => {
        this.props.handleCreating(message)
      });
  }

  render() {
    return (
      <div>
        <h1>New Category</h1>
        <CategoryForm
        category={this.state.category}
        onSave={this.saveCategory}
        onChange={this.updateCategoryState}
        saving={this.state.saving} />
      </div>
    );
  }
}

NewCategoryPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let category = {name: '', category_query: ''};
  let authToken = state.authentication.token;
  return {category: category, authToken: authToken};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCategoryPage));
