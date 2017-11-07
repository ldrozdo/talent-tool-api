import queryApi from '../api/queryApi';
import termApi from '../api/termApi';
import * as types from './actionTypes';

export function loadQueries() {
  return function(dispatch) {
    return queryApi.getAllQueries().then(queries => {
      dispatch(loadQueriesSuccess(queries));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadQueriesSuccess(queries) {
  return {type: types.LOAD_QUERIES_SUCCESS, queries};
}

export function updateQuery(query) {
  return function (dispatch) {
    return queryApi.updateQuery(query).then(responseQuery => {
      dispatch(updateQuerySuccess(responseQuery));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateQuerySuccess(query) {
  return {type: types.UPDATE_QUERY_SUCCESS, query}
}

export function createQuery(query) {
  return function (dispatch) {
    return queryApi.createQuery(query).then(responseQuery => {
      dispatch(createQuerySuccess(responseQuery));
      return responseQuery;
    }).catch(error => {
      throw(error);
    });
  };
}

export function createQuerySuccess(query) {
  return {type: types.CREATE_QUERY_SUCCESS, query}
}

export function deleteQuery(query) {
  return function(dispatch) {
    return queryApi.deleteQuery(query).then(() => {
      console.log(`Deleted ${query.id}`)
      dispatch(deleteQuerySuccess(query));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function deleteQuerySuccess(query) {
  return {type: types.DELETE_QUERY_SUCCESS, query}
}

export function loadBasicFormOfQuery(query) {
  return function(dispatch) {
    return queryApi.getBasicFormOfQuery(query).then(basicForm => {
      dispatch(loadBasicFormOfQuerySuccess(basicForm));
      return basicForm;
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadBasicFormOfQuerySuccess(basicForm) {
  return {type: types.LOAD_BASIC_FORM_QUERY_SUCCESS, basicForm};
}

export function loadExpandedQueryLinkedIn(query) {
  return function(dispatch) {
    return queryApi.getExpandedQueryLinkedIn(query).then(expandedQuery => {
      dispatch(loadExpandedQueryLinkedInSuccess(expandedQuery));
      return expandedQuery;
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadExpandedQueryLinkedInSuccess(expandedQuery) {
  return {type: types.LOAD_LINKEDIN_FORM_QUERY_SUCCESS, expandedQuery};
}
