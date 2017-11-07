import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function termReducer(state = initialState.terms, action) {
  switch(action.type) {
    case types.LOAD_TERMS_SUCCESS:
      return action.terms;
    case types.CREATE_TERM_SUCCESS:
      return [
        ...state.filter(term => term.id !== action.term.id),
        Object.assign({}, action.term)
      ]
    default:
      return state;
  }
}
