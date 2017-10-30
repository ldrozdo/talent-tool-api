class LanguageApi {

  static getAllLanguages() {
    return fetch('http://localhost:4000/languages').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateLanguage(language) {
   const request = new Request(`http://localhost:4000/languages/${language.id}`, {
     method: 'PUT',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify(language)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createLanguage(language) {
    const request = new Request('http://localhost:4000/languages', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(language)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteLanguage(language) {
    const request = new Request(`http://localhost:4000/languages/${language.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default LanguageApi;
