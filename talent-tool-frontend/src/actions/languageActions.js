import languageApi from '../api/languageApi';
import * as types from './actionTypes';

export function loadLanguages() {
  return function(dispatch) {
    return languageApi.getAllLanguages().then(languages => {
      dispatch(loadLanguagesSuccess(languages));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadLanguagesSuccess(languages) {
  return {type: types.LOAD_LANGUAGES_SUCCESS, languages};
}

export function updateLanguage(language, authToken) {
  return function (dispatch) {
    return languageApi.updateLanguage(language, authToken).then(responseLanguage => {
      dispatch(updateLanguageSuccess(responseLanguage));
      return responseLanguage;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateLanguageSuccess(language) {
  return {type: types.UPDATE_LANGUAGE_SUCCESS, language}
}

export function createLanguage(language, authToken) {
  return function (dispatch) {
    return languageApi.createLanguage(language, authToken).then(responseLanguage => {
      dispatch(createLanguageSuccess(responseLanguage));
      return responseLanguage;
    }).catch(error => {
      throw(error);
    });
  };
}

export function createLanguageSuccess(language) {
  return {type: types.CREATE_LANGUAGE_SUCCESS, language}
}

export function deleteLanguage(language, authToken) {
  return function(dispatch) {
    return languageApi.deleteLanguage(language, authToken).then(() => {
      console.log(`Deleted ${language.id}`)
      dispatch(deleteLanguageSuccess(language));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function deleteLanguageSuccess(language) {
  return {type: types.DELETE_LANGUAGE_SUCCESS, language}
}
