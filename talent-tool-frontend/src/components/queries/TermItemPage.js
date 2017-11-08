import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import * as termActions from '../../actions/termActions';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Glyphicon} from 'react-bootstrap';

class TermItemPage extends React.Component {
  constructor(props) {
    super(props);

    super(props);
    this.state = {
      term: this.props.term,
      category: this.props.category
    };

    this.deleteTerm = this.deleteTerm.bind(this);
  }


  deleteTerm(event) {
    event.preventDefault();
    this.props.actions.deleteTerm(this.state.term);
  }


  render() {
    return (
      <Button onClick={this.deleteTerm}><Glyphicon glyph="remove" /> {this.state.category.name}</Button>
    );
  }
}

TermItemPage.propTypes = {
  term: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let term = ownProps.term;
  let category = ownProps.category;
  return {term: term, category: category };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(termActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TermItemPage));
