import React from 'react';
import {connect} from 'react-redux';
import * as queryActions from '../../actions/queryActions';
import PropTypes from 'prop-types';
import { Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import QueryList from './QueryList';
import QueryPage from './QueryPage';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Button} from 'react-bootstrap';

class Queries extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      query: this.props.query,
      selectedQuery: null,
      queries: this.props.queries,
      isCreating: false
    };

    this.onQueryClicked = this.onQueryClicked.bind(this);
    this.onQueryUpdated = this.onQueryUpdated.bind(this);
    this.onQueryDeleted = this.onQueryDeleted.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
  }

  onQueryClicked(queryIndex) {
    this.setState({isCreating: false});
    this.setState({ selectedQuery: queryIndex });
  }

  onQueryUpdated(query){
    if (query.id){
      this.setState({ query: query });
      this.props.queries[this.state.selectedQuery] = query;
      this.setState({ queries: this.props.queries });
    }
  }

  onQueryDeleted(){
    this.setState({isCreating: false});
    this.setState({selectedQuery: null});
  }

  toggleCreating() {
    this.state.selectedQuery = null;
    this.setState({isCreating: true});
  }

  render() {
    const { selectedQuery } = this.state;

    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
          <h2>Your queries &nbsp;

          </h2>
          <QueryList queries={this.props.queries} onQueryClicked={this.onQueryClicked}  />
          </Col>
          <Col xs={8} md={8}>
            {selectedQuery !== null && <QueryPage query={this.props.queries[selectedQuery]}/>}

          </Col>

        </Row>
      </Grid>
    )
  }
}


Queries.propTypes = {
  queries: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    queries: state.queries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(queryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Queries));
