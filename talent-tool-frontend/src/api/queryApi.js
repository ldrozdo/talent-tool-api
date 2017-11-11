class QueryApi {

  static getAllQueries(authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log(localStorage.getItem('token'));
    const request = new Request('http://localhost:4000/queries', {
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
   const request = new Request(`http://localhost:4000/queries/${query.id}`, {
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
    const request = new Request('http://localhost:4000/queries', {
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
    const request = new Request(`http://localhost:4000/queries/${query.id}`, {
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
    const request = new Request(`http://localhost:4000/basic_form_query/${query.id}`, {
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
    const request = new Request(`http://localhost:4000/expanded_query_linkedin/${query.id}`, {
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
