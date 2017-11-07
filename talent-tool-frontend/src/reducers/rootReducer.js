import {combineReducers} from 'redux';
import languages from './languageReducer';
import categories from './categoryReducer';
import allTranslations from './translationReducer';
import queries from './queryReducer';
import terms from './termReducer';

const rootReducer = combineReducers({
  // short hand property names
  languages,
  categories,
  allTranslations,
  queries,
  terms
})

export default rootReducer;
