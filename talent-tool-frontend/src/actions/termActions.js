import * as types from './actionTypes';
import termApi from '../api/termApi';

export function loadTerms() {
  return function(dispatch) {
    return termApi.getAllTerms().then(terms => {
      dispatch(loadTermsSuccess(terms));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadTermsSuccess(terms) {
  return {type: types.LOAD_TERMS_SUCCESS, terms};
}

export function createTerm(term) {
  return function (dispatch) {
    return termApi.createTerm(term).then(responseTerm => {
      dispatch(createTermSuccess(responseTerm));
      return responseTerm;
    }).catch(error => {
      throw(error);
    });
  };
}

export function createTermSuccess(term) {
  return {type: types.CREATE_TERM_SUCCESS, term}
}
