import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function languageReducer(state = initialState.languages, action) {
  switch(action.type) {
    case types.LOAD_LANGUAGES_SUCCESS:
      return action.languages
    case types.UPDATE_LANGUAGE_SUCCESS:
      return [
        ...state.filter(language => language.id !== action.language.id),
        Object.assign({}, action.language)
      ]
    case types.CREATE_LANGUAGE_SUCCESS:
      return [
        ...state.filter(language => language.id !== action.language.id),
        Object.assign({}, action.language)
      ]
    case types.DELETE_LANGUAGE_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfLangToDelete = state.findIndex(language => {
        return language.id == action.language.id
      })
      newState.splice(indexOfLangToDelete, 1);
      return newState;
    }
    default:
      return state;
  }
}
