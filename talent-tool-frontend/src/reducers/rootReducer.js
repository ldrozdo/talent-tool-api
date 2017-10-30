import {combineReducers} from 'redux';
import languages from './languageReducer';

const rootReducer = combineReducers({
  // short hand property names
  languages
})

export default rootReducer;
