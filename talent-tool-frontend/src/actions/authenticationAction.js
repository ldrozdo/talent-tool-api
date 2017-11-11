import * as types from './actionTypes';
import Keycloak from 'keycloak-js';

export function handleAuthentication() {
  return function(dispatch) {
    var keycloak = Keycloak();
    // keycloak.init().success(function(authenticated) {
    //         alert(authenticated ? 'authenticated' : 'not authenticated');
    //     }).error(function() {
    //         alert('failed to initialize');
    //     });
    keycloak.init({ onLoad: 'login-required' }).success(keycloakInfo => {
      dispatch(handleAuthenticationSuccess(keycloak));
    });
    return keycloak;
  };
}

export function handleAuthenticationSuccess(keycloakInfo) {
  return {type: types.AUTHENTICATION_SUCCESS, keycloakInfo};
}
