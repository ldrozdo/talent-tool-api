import React from 'react';
import {connect} from 'react-redux';
import * as categoryActions from '../../actions/categoryActions';
import PropTypes from 'prop-types';
import { Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import CategoryList from './CategoryList';
import CategoryPage from './CategoryPage';
import NewCategoryPage from './NewCategoryPage';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Button, Alert} from 'react-bootstrap';

class Categories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      category: this.props.category,
      selectedCategory: null,
      categories: this.props.categories,
      isCreating: false,
      errorMessage: null,
      isAdmin: this.props.isAdmin
    };

    this.onCategoryClicked = this.onCategoryClicked.bind(this);
    this.onCategoryUpdated = this.onCategoryUpdated.bind(this);
    this.onCategoryDeleted = this.onCategoryDeleted.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.handleCreating = this.handleCreating.bind(this);
  }

  onCategoryClicked(catIndex) {
    this.setState({isCreating: false});
    this.setState({ selectedCategory: catIndex });
    this.setState({ errorMessage: null });
  }

  onCategoryUpdated(category){
    if (category.id && this.state.errorMessage != null) {
      this.setState({ category: category });
      this.props.categories[this.state.selectedCategory] = category;
      this.setState({ categories: this.props.categories });
    }
  }

  toggleCreating() {
    this.setState({ errorMessage: null });
    this.state.selectedCategory = null;
    this.setState({isCreating: true});
  }

  handleCreating(errorMessage){
    this.state.selectedCategory = null;
    this.setState({isCreating: false});
    if (errorMessage) {
      this.setState({errorMessage: errorMessage});
    }
  }

  onCategoryDeleted(){
    this.setState({isCreating: false});
    this.setState({selectedCategory: null});
  }


  render() {
    const { selectedCategory } = this.state;

    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
          <h2>Categories &nbsp;
          { this.state.isAdmin &&
            <Button bsSize="xsmall" onClick={this.toggleCreating}> + Category</Button>
          }
          </h2>
          <CategoryList categories={this.props.categories} onCategoryClicked={this.onCategoryClicked}  />
          </Col>
          <Col xs={8} md={8}>
          {this.state.errorMessage &&
            <Alert bsStyle="warning">
              <p>{this.state.errorMessage}</p>
            </Alert>
          }
          {selectedCategory !== null && <CategoryPage category={this.props.categories[selectedCategory]}
          onCategoryUpdated={this.onCategoryUpdated} onCategoryDeleted={this.onCategoryDeleted}
          handleCreating={this.handleCreating} />}
          {this.state.isCreating !== false && this.state.isAdmin && <NewCategoryPage handleCreating={this.handleCreating}/>}
          </Col>

        </Row>
      </Grid>
    )
  }
}


Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  let rolesOfUser = localStorage.getItem('roles');
  let isAdmin = (rolesOfUser.indexOf("app_admin") > -1);
  return {
    categories: state.categories, isAdmin: isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Categories));
