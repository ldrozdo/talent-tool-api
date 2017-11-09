import React from 'react';
import {connect} from 'react-redux';
import * as queryActions from '../../actions/queryActions';
import PropTypes from 'prop-types';
import { Button, Panel} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import TermsList from './TermsList';
import AddTermPage from './AddTermPage';
import SimpleQueryForm from './SimpleQueryForm';
import ComplexQueryForm from './ComplexQueryForm';


class QueryPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      query: this.props.query,
      terms: this.props.terms,
      categories: this.props.categories,
      basic_form_query: '',
      linkedin_query: '',
      saving: false,
      isEditing: false,
      basicViewOpen: false,
      expandedViewOpen: false};

    this.toggleEdit = this.toggleEdit.bind(this);
    this.getAndTerms = this.getAndTerms.bind(this);
    this.getOrTerms = this.getOrTerms.bind(this);
    this.getNotTerms = this.getNotTerms.bind(this);
    this.updateQueryState = this.updateQueryState.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadBasicFormOfQuery(this.props.query)
      .then(({ query }) => {
        this.setState({ basic_form_query : query });
      });

    this.props.actions.loadExpandedQueryLinkedIn(this.props.query)
      .then(({ query }) => {
          this.setState({ linkedin_query : query });
        });
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query.id != nextProps.query.id) {
      this.setState({query: nextProps.query});
    }

    this.setState({saving: false, isEditing: false});

    // console.log(this.state.query);
    this.props.actions.loadBasicFormOfQuery(nextProps.query)
      .then(({ query }) => {
        this.setState({ basic_form_query : query });
      });

    this.props.actions.loadExpandedQueryLinkedIn(nextProps.query)
      .then(({ query }) => {
          this.setState({ linkedin_query : query });
        });
  }

  getAndTerms(){
    let selected = this.props.terms.map(term => {
      if (term.operator == "AND") {
        return term;
      }
    })
    return selected.filter(el => el != undefined)
  }

  getOrTerms(){
    let selected = this.props.terms.map(term => {
      if (term.operator == "OR") {
        return term;
      }
    })
    return selected.filter(el => el != undefined)
  }

  getNotTerms(){
    let selected = this.props.terms.map(term => {
      if (term.operator == "NOT") {
        return term;
      }
    })
    return selected.filter(el => el != undefined)
  }

  updateQueryState(event) {
    const field = event.target.name;
    const query = this.state.query;
    query[field] = event.target.value;
    return this.setState({query: query});
  }

  saveQuery(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.onUpdate();
    // this.props.actions.updateQuery(this.state.query);
    this.props.actions.updateQuery(this.state.query)
      .then(({ message }) => {
        this.props.handleCreating(message)
      });
  }

  onUpdate(){
    this.props.onQueryUpdated(this.state.query);
  }

  deleteQuery(event) {
    this.props.onQueryDeleted();
    this.props.actions.deleteQuery(this.state.query);
  }


  render() {
    const andTerms = this.getAndTerms();
    const orTerms = this.getOrTerms();
    const notTerms = this.getNotTerms();
    if (this.state.isEditing) {
      return (
        <div>
        <h1>Edit Query</h1>
          {this.state.query.text_of_query == null  &&
            <SimpleQueryForm
            query={this.state.query}
            onSave={this.saveQuery}
            onChange={this.updateQueryState} />
        }

        {(this.state.query.text_of_query !== null ) &&
            <ComplexQueryForm
            query={this.state.query}
            categories = {this.props.categories}
            onSave={this.saveQuery}
            onChange={this.updateQueryState} />
        }
        </div>
      )
    }
    return(
      <div>
      <h1>{this.state.query.name}&nbsp;
      <Button bsSize="small" onClick={this.toggleEdit}>Edit Query</Button>&nbsp;
      <Button bsSize="small" onClick={this.deleteQuery}>Delete Query</Button>
      </h1>
      {(this.state.query.text_of_query == null || this.state.query.text_of_query == "") &&
        <div>
        <h4><b>All</b> of these categories will be in search result: </h4>
        <AddTermPage categories={this.props.categories} operator="AND" query={this.state.query} />
        <TermsList terms={andTerms} categories={this.props.categories}/>
        <hr />
        <h4><b>None</b> of these categories will be in search result: </h4>
        <AddTermPage categories={this.props.categories} operator="NOT" query={this.state.query} />
        <TermsList terms={notTerms} categories={this.props.categories}/>
        <hr />
        <h4><b>At least one</b> of these categories will be in search result: </h4>
        <AddTermPage categories={this.props.categories} operator="OR" query={this.state.query} />
        <TermsList terms={orTerms} categories={this.props.categories}/>
        <hr />

        <Button onClick={() => this.setState({ basicViewOpen: !this.state.basicViewOpen })}>
          View the basic form of query
        </Button>
        <Panel collapsible expanded={this.state.basicViewOpen}>
          {this.state.basic_form_query}
        </Panel>

        </div>
      }

      {(this.state.query.text_of_query !== null ) &&
        <div>
          <h3>Text of query: </h3>
          <h4>{this.state.query.text_of_query}</h4>
        </div>
      }

        <Button onClick={() => this.setState({ expandedViewOpen: !this.state.expandedViewOpen })}>
          View the expanded query for LinkedIn
        </Button>
        <Panel collapsible expanded={this.state.expandedViewOpen}>
          {this.state.linkedin_query}
        </Panel>
        <Button>Search in LinkedIn</Button>
      </div>
    )
  }
}

QueryPage.propTypes = {
  query: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function collectQueryTerms(query, terms) {
  let selected = terms.map(term => {
    if (query.id == term.query_id) {
      return term;
    }
  })
  return selected.filter(el => el != undefined)
}


function mapStateToProps(state, ownProps) {
  let query = {name: ''};
  let allTerms = state.terms;
  let termsOfQuery = [];
  if (ownProps.query) {
    const id = ownProps.query.id;
    if (state.queries.length > 0) {
      query = Object.assign({}, state.queries.find(query => query.id == id))
      termsOfQuery = collectQueryTerms(query,state.terms);
    }
  }
  // if (ownProps.query) {
  //   query = ownProps.query;
  // }
  // let termsOfQuery = collectQueryTerms(query,state.terms)
  return {query: query, terms: termsOfQuery, categories: state.categories};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(queryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QueryPage));
