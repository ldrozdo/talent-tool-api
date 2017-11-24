import * as types from './actionTypes';
import Keycloak from 'keycloak-js';

export function handleAuthentication() {
  return function(dispatch) {
    var keycloak = Keycloak();
    keycloak.init({ onLoad: 'login-required' }).success(keycloakInfo => {
      dispatch(handleAuthenticationSuccess(keycloak));
      console.log("authentication");
      console.log(keycloak.tokenParsed.realm_access.roles);
      localStorage.setItem('token', keycloak.token);
      localStorage.setItem('roles', keycloak.tokenParsed.realm_access.roles);
    });
    return keycloak;
  };
}

export function handleAuthenticationSuccess(keycloakInfo) {
  return {type: types.AUTHENTICATION_SUCCESS, keycloakInfo};
}
