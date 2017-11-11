class TermApi {

  static getAllTerms() {
    return fetch('http://localhost:4000/terms').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createTerm(term, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
     const request = new Request(`http://localhost:4000/queries/${term.query_id}/categories/${term.category_id}/terms`, {
       method: 'POST',
       headers: headers,
       body: JSON.stringify(term)
     });

     return fetch(request).then(response => {
       return response.json();
     }).catch(error => {
       return error;
     });
   }

   static deleteTerm(term, authToken) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + authToken);
     const request = new Request(`http://localhost:4000/terms/${term.id}`, {
       method: 'DELETE',
       headers: headers
     });

     return fetch(request).then(response => {
       return response.json();
     }).catch(error => {
       return error;
     });
   }

}

export default TermApi;
