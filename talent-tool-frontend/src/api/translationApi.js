class TranslationApi {
  static getAllTranslations() {
    return fetch(`http://localhost:4000/translations`).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });
  }

  static updateTranslation(translation) {
   const request = new Request(`http://localhost:4000/translations/${translation.id}`, {
     method: 'PUT',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify(translation)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createTranslation(translation) {
    const request = new Request(`http://localhost:4000/categories/${translation.category_id}/languages/${translation.language_id}/translations`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(translation)
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteTranslation(translation) {
    const request = new Request(`http://localhost:4000/translations/${translation.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


};

export default TranslationApi;
