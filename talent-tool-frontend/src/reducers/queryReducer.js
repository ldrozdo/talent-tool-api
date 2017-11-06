import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function queryReducer(state = initialState.queries, action) {
  switch(action.type) {
    case types.LOAD_QUERIES_SUCCESS:
      return action.queries
    case types.UPDATE_QUERY_SUCCESS:
      return [
        ...state.filter(query => query.id !== action.query.id),
        Object.assign({}, action.query)
      ]
    case types.CREATE_QUERY_SUCCESS:
      return [
        ...state.filter(query => query.id !== action.query.id),
        Object.assign({}, action.query)
      ]
    case types.DELETE_QUERY_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfQueryToDelete = state.findIndex(query => {
        return query.id == action.query.id
      })
      newState.splice(indexOfQueryToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
