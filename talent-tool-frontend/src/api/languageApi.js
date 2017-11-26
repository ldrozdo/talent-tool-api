import * as host from './ApiHost'

class LanguageApi {

  static getAllLanguages() {
    return fetch(`${host.API_HOST}/languages`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateLanguage(language, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/languages/${language.id}`, {
     method: 'PUT',
    headers: headers,
     body: JSON.stringify(language)
   });
   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      console.log(error)
      return error;
    });
 }

 static createLanguage(language, authToken) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/languages`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(language)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteLanguage(language, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`${host.API_HOST}/languages/${language.id}`, {
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

export default LanguageApi;
