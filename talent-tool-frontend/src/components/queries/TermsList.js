import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as termActions from '../../actions/termActions';
import TermItemPage from './TermItemPage';

class TermsList extends React.Component {

  constructor(props) {
    super(props);

    this.findCategoryForTerm = this.findCategoryForTerm.bind(this);

  }


  findCategoryForTerm(term){
    let selected = this.props.categories.map(category => {
      if (category.id == term.category_id) {
        return category;
      }
    })
    let category = selected.filter(el => el != undefined)[0];
    return category
  };


  render() {
    return (
      <div>
        <ul className="list-unstyled">
          {this.props.terms.map(term =>
              <li key={term.id}>
              <TermItemPage term = {term} category={this.findCategoryForTerm(term)}/>
              </li>
            )}
        </ul>
      </div>
    );
  }
}

TermsList.propTypes = {
  terms: PropTypes.array.isRequired
};

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(termActions, dispatch)
//   };
// }

export default TermsList;
