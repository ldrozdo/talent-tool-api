import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {loadLanguages} from './actions/languageActions';
import {loadCategories} from './actions/categoryActions';
import {loadTranslations} from './actions/translationActions';
import {loadQueries} from './actions/queryActions';

const store = configureStore();
store.dispatch(loadLanguages());
store.dispatch(loadCategories());
store.dispatch(loadTranslations());
store.dispatch(loadQueries());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
registerServiceWorker();
