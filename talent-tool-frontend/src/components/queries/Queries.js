import React from 'react';
import {connect} from 'react-redux';
import * as queryActions from '../../actions/queryActions';
import PropTypes from 'prop-types';
import { Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import QueryList from './QueryList';
import QueryPage from './QueryPage';
import NewQueryPage from './NewQueryPage';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Button, Alert} from 'react-bootstrap';
import Search from '../common/Search';

class Queries extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      query: this.props.query,
      selectedQuery: null,
      queries: this.props.queries,
      categories: this.props.categories,
      isCreating: false,
      errorMessage: null,
      authToken: this.props.authToken,
      searchText: ''
    };

    this.onQueryClicked = this.onQueryClicked.bind(this);
    this.onQueryUpdated = this.onQueryUpdated.bind(this);
    this.onQueryDeleted = this.onQueryDeleted.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.handleCreating = this.handleCreating.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onQueryClicked(queryIndex) {
    this.setState({isCreating: false});
    this.setState({ selectedQuery: queryIndex });
    this.setState({ errorMessage: null });
  }

  onQueryUpdated(query){
    if (query.id && this.state.errorMessage != null){
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
    this.setState({ errorMessage: null });
    this.state.selectedQuery = null;
    this.setState({isCreating: true});
  }

  handleCreating(errorMessage){
    this.state.selectedQuery = null;
    this.setState({isCreating: false});
    if (errorMessage) {
      this.setState({errorMessage: errorMessage});
    }
  }

  handleSearch(searchText) {
      this.setState({searchText: searchText});
   }


  render() {
    const { selectedQuery } = this.state;

    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
          <h2>Your queries &nbsp;
          <Button bsSize="xsmall" onClick={this.toggleCreating}> + Query</Button>
          </h2>
          <Search handleSearch={this.handleSearch} searchText={this.props.searchText} />
          <QueryList queries={this.props.queries} onQueryClicked={this.onQueryClicked} searchText={this.state.searchText} />
          </Col>
          <Col xs={8} md={8}>
            {this.state.errorMessage &&
              <Alert bsStyle="warning">
                <p>{this.state.errorMessage}</p>
              </Alert>
            }
            {selectedQuery !== null && <QueryPage query={this.props.queries[selectedQuery]} handleCreating={this.handleCreating}
            onQueryUpdated={this.onQueryUpdated} onQueryDeleted={this.onQueryDeleted} />}
            {this.state.isCreating !== false && <NewQueryPage handleCreating={this.handleCreating} categories={this.props.categories}/>}
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
    queries: state.queries,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(queryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Queries));
