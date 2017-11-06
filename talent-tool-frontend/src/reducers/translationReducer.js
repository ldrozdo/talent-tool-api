import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function translationReducer(state = initialState.allTranslations, action) {
  switch(action.type) {
    case types.LOAD_TRANSLATIONS_SUCCESS:
      return action.translations;
    case types.UPDATE_TRANSLATION_SUCCESS:
        return [
          ...state.filter(translation => translation.id !== action.translation.id),
          Object.assign({}, action.translation)
        ]
    case types.CREATE_TRANSLATION_SUCCESS:
        return [
          ...state.filter(translation => translation.id !== action.translation.id),
          Object.assign({}, action.translation)
        ]
    case types.DELETE_TRANSLATION_SUCCESS: {
        const newState = Object.assign([], state);
        const indexOfTransToDelete = state.findIndex(translation => {
          return translation.id == action.translation.id
        })
        newState.splice(indexOfTransToDelete, 1);
        return newState;
      }
    default:
      return state;
  }
}
