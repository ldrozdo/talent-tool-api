class QueryApi {

  static getAllQueries() {
    return fetch('http://localhost:4000/queries').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateQuery(query) {
   const request = new Request(`http://localhost:4000/queries/${query.id}`, {
     method: 'PUT',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify(query)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createQuery(query) {
    const request = new Request('http://localhost:4000/queries', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(query)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteQuery(query) {
    const request = new Request(`http://localhost:4000/queries/${query.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default QueryApi;
