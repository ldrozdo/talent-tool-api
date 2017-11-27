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
    var terms = this.props.terms.map(term => {
      if(this.findCategoryForTerm(term))
        return <TermItemPage term = {term} category={this.findCategoryForTerm(term)} />;
      });
        return <div>
                <br />
                  <ul className="list-unstyled">{terms}</ul>
               </div>;
  }
}

TermsList.propTypes = {
  terms: PropTypes.array.isRequired
};

export default TermsList;
