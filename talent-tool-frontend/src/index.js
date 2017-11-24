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
import {loadTerms} from './actions/termActions';
import {handleAuthentication} from './actions/authenticationAction';
import Keycloak from 'keycloak-js';

const store = configureStore();

var keycloak = Keycloak();
keycloak.init({ onLoad: 'login-required' }).success(keycloakInfo => {
  localStorage.setItem('token', keycloak.token);
  localStorage.setItem('roles', keycloak.tokenParsed.realm_access.roles);

  store.dispatch(loadLanguages());
  store.dispatch(loadCategories());
  store.dispatch(loadTranslations());
  store.dispatch(loadQueries(localStorage.getItem('token')));
  store.dispatch(loadTerms());
});




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
registerServiceWorker();
