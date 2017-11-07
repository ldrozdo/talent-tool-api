import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Glyphicon} from 'react-bootstrap';

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

  // deleteTranslation(event,translation) {
  //   this.props.actions.deleteTranslation(translation);
  // }

  render() {
    return (
      <div>
        <ul className="list-unstyled">
          {this.props.terms.map(term =>
              <li key={term.id}>
              <Button><Glyphicon glyph="remove" /> {this.findCategoryForTerm(term).name}</Button>
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
//     actions: bindActionCreators(categoryActions, dispatch)
//   };
// }

export default TermsList;
