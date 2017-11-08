class TermApi {

  static getAllTerms() {
    return fetch('http://localhost:4000/terms').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createTerm(term) {
     const request = new Request(`http://localhost:4000/queries/${term.query_id}/categories/${term.category_id}/terms`, {
       method: 'POST',
       headers: new Headers({
         'Content-Type': 'application/json'
       }),
       body: JSON.stringify(term)
     });
     return fetch(request).then(response => {
       return response.json();
     }).catch(error => {
       return error;
     });
   }

   static deleteTerm(term) {
     const request = new Request(`http://localhost:4000/terms/${term.id}`, {
       method: 'DELETE'
     });

     return fetch(request).then(response => {
       return response.json();
     }).catch(error => {
       return error;
     });
   }

}

export default TermApi;
