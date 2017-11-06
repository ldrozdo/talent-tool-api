import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action) {
  switch(action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories
    case types.UPDATE_CATEGORY_SUCCESS:
      return [
        ...state.filter(category => category.id !== action.category.id),
        Object.assign({}, action.category)
      ]
    case types.CREATE_CATEGORY_SUCCESS:
      return [
        ...state.filter(category => category.id !== action.category.id),
        Object.assign({}, action.category)
      ]
    case types.DELETE_CATEGORY_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfCatToDelete = state.findIndex(category => {
        return category.id == action.category.id
      })
      newState.splice(indexOfCatToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
