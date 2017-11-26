import * as host from './ApiHost'

class TranslationApi {
  static getAllTranslations() {
    return fetch(`${host.API_HOST}/translations`).then(response => {
      return response.json()
    }).catch(error => {
      return error
    });
  }

  static updateTranslation(translation, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
   const request = new Request(`${host.API_HOST}/translations/${translation.id}`, {
     method: 'PUT',
     headers: headers,
     body: JSON.stringify(translation)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createTranslation(translation, authToken) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/categories/${translation.category_id}/languages/${translation.language_id}/translations`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(translation)
    });
    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteTranslation(translation, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/translations/${translation.id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


};

export default TranslationApi;
