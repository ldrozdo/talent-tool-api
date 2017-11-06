import {combineReducers} from 'redux';
import languages from './languageReducer';
import categories from './categoryReducer';
import allTranslations from './translationReducer';

const rootReducer = combineReducers({
  // short hand property names
  languages,
  categories,
  allTranslations
})

export default rootReducer;
