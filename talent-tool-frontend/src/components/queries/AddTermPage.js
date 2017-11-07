import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../common/AutocompleteInput';
import * as termActions from '../../actions/termActions';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class AddTermPage extends React.Component {
  constructor(props) {
    super(props);

    //query, operator, categories
    this.state = {
      term: {
        category_id: '',
        query_id: this.props.query.id,
        operator: this.props.operator
      },
      query: this.props.query
    };

    this.saveTerm = this.saveTerm.bind(this);
    this.findCategoryByName = this.findCategoryByName.bind(this);
  }


  saveTerm(event) {
    // event.preventDefault();
    const term = this.state.term;
    const category = this.findCategoryByName(event)
    term['category_id'] = category.id;
    console.log(this.state.term);
    this.props.actions.createTerm(this.state.term);
  }

  findCategoryByName(name){
    let selected = this.props.categories.map(category => {
      if (category.name == name) {
        return category;
      }
    })
    return selected.filter(el => el != undefined)[0]
  }


  render() {
    return (
        <AutocompleteInput
          categories = {this.props.categories}
          onSelect = {this.saveTerm}
        />
  );
  }
}

AddTermPage.propTypes = {
  term: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let term = {operator: '', category_id: '', query_id: ''};
  return {term: term};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(termActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTermPage));
