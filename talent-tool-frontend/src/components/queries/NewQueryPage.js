import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as queryActions from '../../actions/queryActions';
import SimpleQueryForm from './SimpleQueryForm';
import ComplexQueryForm from './ComplexQueryForm';
import { withRouter } from 'react-router-dom';
import {Tabs, Tab} from 'react-bootstrap';



class NewQueryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: {
        name: '',
        text_of_query: ''
      },
      saving: false
    };

    this.saveSimpleQuery = this.saveSimpleQuery.bind(this);
    this.saveComplexQuery = this.saveComplexQuery.bind(this);
    this.updateQueryState = this.updateQueryState.bind(this);
    this.resetQueryState = this.resetQueryState.bind(this);
  }


  updateQueryState(event) {
    const field = event.target.name;
    const query = this.state.query;
    query[field] = event.target.value;
    return this.setState({query: query});
  }

  saveSimpleQuery(event) {
    event.preventDefault();
    this.setState({saving: true});
    const query = this.state.query;
    query['text_of_query'] = null;
    this.props.actions.createQuery(query);
    this.props.turnOffCreating();
  }

  saveComplexQuery(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.createQuery(this.state.query);
    this.props.turnOffCreating();
  }

  resetQueryState() {
    let query = {name: '', text_of_query: ''};
    this.setState({query: query});
  }

  render() {
    return (
      <div>
        <h1>New Query</h1>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" >
          <Tab eventKey={1} title="Create Simple Query">
            <br/>
            <p>Create the name of your query and click Save. After that, choose the new query from the menu, edit it and use it.</p>
            <SimpleQueryForm
              query={this.props.query}
              onSave={this.saveSimpleQuery}
              onChange={this.updateQueryState}
              saving={this.state.saving} />
          </Tab>
          <Tab eventKey={2} title="Create Complex Query">
            <br/>
            <p>Create the name and text of your query. You can help yourself with already created categories.
            Click Save, choose the new query from the menu, edit it and use it.</p>
            <ComplexQueryForm
              query={this.props.query}
              categories={this.props.categories}
              onSave={this.saveComplexQuery}
              onChange={this.updateQueryState}
              saving={this.state.saving} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

NewQueryPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let query = {name: '', text_of_query: ''};
  return {query: query};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(queryActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewQueryPage));
