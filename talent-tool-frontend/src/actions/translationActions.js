import * as types from './actionTypes';
import translationApi from '../api/translationApi';

export function loadTranslationsSuccess(translations) {
  return {type: types.LOAD_TRANSLATIONS_SUCCESS, translations};
}

export function loadTranslations() {
  return function(dispatch) {
    return translationApi.getAllTranslations().then(translations => {
      dispatch(loadTranslationsSuccess(translations));
    }).catch(error => {
      throw(error);
    });
  };
}
