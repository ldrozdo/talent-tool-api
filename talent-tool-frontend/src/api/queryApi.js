import * as host from './ApiHost'

class QueryApi {

  static getAllQueries(authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    console.log("som v api")
    const request = new Request(`${host.API_HOST}/queries`, {
      method: 'GET',
      headers: headers
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateQuery(query, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
   const request = new Request(`${host.API_HOST}/queries/${query.id}`, {
     method: 'PUT',
     headers: headers,
     body: JSON.stringify(query)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createQuery(query, authToken) {
   let headers = new Headers();
   headers.append('Content-Type', 'application/json');
   headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/queries`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(query)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteQuery(query, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/queries/${query.id}`, {
      method: 'DELETE',
      headers: headers,
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getBasicFormOfQuery(query, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/basic_form_query/${query.id}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getExpandedQueryLinkedIn(query, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/expanded_query_linkedin/${query.id}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default QueryApi;
