import * as host from './ApiHost'

class TermApi {

  static getAllTerms() {
    return fetch(`${host.API_HOST}/terms`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createTerm(term, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
     const request = new Request(`${host.API_HOST}/queries/${term.query_id}/categories/${term.category_id}/terms`, {
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
     const request = new Request(`${host.API_HOST}/terms/${term.id}`, {
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
