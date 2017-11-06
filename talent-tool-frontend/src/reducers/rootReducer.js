import {combineReducers} from 'redux';
import languages from './languageReducer';
import categories from './categoryReducer';
import allTranslations from './translationReducer';
import queries from './queryReducer';

const rootReducer = combineReducers({
  // short hand property names
  languages,
  categories,
  allTranslations,
  queries
})

export default rootReducer;
